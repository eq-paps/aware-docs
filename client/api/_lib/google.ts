import { createRemoteJWKSet, jwtVerify } from 'jose'

/**
 * Google OpenID Connect helpers: build the consent URL, exchange the auth
 * code, and — critically — decide whether a verified Google identity is
 * allowed. Access is restricted to a single Google Workspace domain.
 */

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/oauth2/v3/certs'),
)

export const allowedDomain = (): string =>
  (process.env.ALLOWED_HOSTED_DOMAIN || 'equature.com').toLowerCase()

const clientId = (): string => {
  const id = process.env.GOOGLE_CLIENT_ID
  if (!id) throw new Error('GOOGLE_CLIENT_ID is not set')
  return id
}

const clientSecret = (): string => {
  const secret = process.env.GOOGLE_CLIENT_SECRET
  if (!secret) throw new Error('GOOGLE_CLIENT_SECRET is not set')
  return secret
}

export type GoogleIdentity = {
  email: string
  emailVerified: boolean
  hd?: string
  name?: string
}

export const buildAuthUrl = (redirectUri: string, state: string): string => {
  const url = new URL(GOOGLE_AUTH_URL)
  url.searchParams.set('client_id', clientId())
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('state', state)
  // hd is a UX hint only (it pre-filters the account picker). It is NOT a
  // security control — the real enforcement is isAllowedIdentity() below.
  url.searchParams.set('hd', allowedDomain())
  url.searchParams.set('prompt', 'select_account')
  return url.toString()
}

/** Exchange an auth code for tokens and return the verified ID-token claims. */
export const exchangeCode = async (
  code: string,
  redirectUri: string,
): Promise<GoogleIdentity> => {
  const body = new URLSearchParams({
    code,
    client_id: clientId(),
    client_secret: clientSecret(),
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  })

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!response.ok) {
    throw new Error(`Google token exchange failed: ${response.status}`)
  }
  const tokens = (await response.json()) as { id_token?: string }
  if (!tokens.id_token) {
    throw new Error('Google token response did not include an id_token')
  }

  const { payload } = await jwtVerify(tokens.id_token, GOOGLE_JWKS, {
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: clientId(),
  })

  return {
    email: typeof payload.email === 'string' ? payload.email : '',
    emailVerified: payload.email_verified === true || payload.email_verified === 'true',
    hd: typeof payload.hd === 'string' ? payload.hd : undefined,
    name: typeof payload.name === 'string' ? payload.name : undefined,
  }
}

/**
 * The one place access is decided. Requires ALL of:
 *  - a verified email
 *  - the Workspace hosted-domain (hd) claim matching the allowed domain
 *  - the email itself ending in @<allowed domain>
 * The hd check is what blocks a personal @gmail.com account from getting in.
 */
export const isAllowedIdentity = (identity: GoogleIdentity): boolean => {
  const domain = allowedDomain()
  const email = identity.email.toLowerCase()
  return (
    identity.emailVerified &&
    identity.hd?.toLowerCase() === domain &&
    email.endsWith(`@${domain}`)
  )
}
