import { jwtVerify, SignJWT } from 'jose'

/**
 * Stateless session: a short-lived HS256 JWT stored in an HttpOnly cookie.
 * No database — the signature is the source of truth. Used by the OAuth
 * callback (to mint), by the edge middleware and protected API (to verify),
 * and by the session endpoint (to report auth state to the client).
 */

const encoder = new TextEncoder()

export const SESSION_COOKIE = 'aware_session'
const ISSUER = 'aware-docs'
const AUDIENCE = 'aware-docs-internal'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

export type SessionClaims = {
  email: string
  name?: string
  hd?: string
}

const secretKey = (): Uint8Array => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set to a random string of at least 32 characters',
    )
  }
  return encoder.encode(secret)
}

export const createSessionToken = async (claims: SessionClaims): Promise<string> =>
  new SignJWT({ email: claims.email, name: claims.name, hd: claims.hd })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setSubject(claims.email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey())

export const verifySessionToken = async (
  token: string,
): Promise<SessionClaims | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    })
    const email = typeof payload.email === 'string' ? payload.email : null
    if (!email) return null
    return {
      email,
      name: typeof payload.name === 'string' ? payload.name : undefined,
      hd: typeof payload.hd === 'string' ? payload.hd : undefined,
    }
  } catch {
    return null
  }
}

const cookieAttrs = (maxAge: number) =>
  `Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`

export const sessionCookie = (token: string): string =>
  `${SESSION_COOKIE}=${token}; ${cookieAttrs(SESSION_MAX_AGE)}`

export const clearedSessionCookie = (): string =>
  `${SESSION_COOKIE}=; ${cookieAttrs(0)}`

/** Minimal cookie reader that works with both Node and edge request headers. */
export const readCookie = (
  cookieHeader: string | null | undefined,
  name: string,
): string | null => {
  if (!cookieHeader) return null
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim())
    }
  }
  return null
}
