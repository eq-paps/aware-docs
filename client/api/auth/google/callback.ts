import type { VercelRequest, VercelResponse } from '@vercel/node'
import { exchangeCode, isAllowedIdentity } from '../../_lib/google'
import { requestOrigin, safeReturnTo } from '../../_lib/http'
import { createSessionToken, readCookie, sessionCookie } from '../../_lib/session'

const STATE_COOKIE = 'aware_oauth_state'
const RETURN_COOKIE = 'aware_oauth_return'
const clearTemp = (name: string) =>
  `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`

/** GET /api/auth/google/callback — completes the OAuth exchange. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cookies = req.headers.cookie
  const expectedState = readCookie(cookies, STATE_COOKIE)
  const returnTo = safeReturnTo(
    decodeURIComponent(readCookie(cookies, RETURN_COOKIE) ?? '/'),
  )
  const code = typeof req.query.code === 'string' ? req.query.code : null
  const state = typeof req.query.state === 'string' ? req.query.state : null

  const clearedTemp = [clearTemp(STATE_COOKIE), clearTemp(RETURN_COOKIE)]

  const deny = (reason: string) => {
    res.statusCode = 302
    res.setHeader('Set-Cookie', clearedTemp)
    res.setHeader('Location', `/?auth=${reason}`)
    res.end()
  }

  // Validate the CSRF state before trusting anything else.
  if (!code || !state || !expectedState || state !== expectedState) {
    return deny('invalid_request')
  }

  try {
    const origin = requestOrigin(req)
    const identity = await exchangeCode(code, `${origin}/api/auth/google/callback`)

    if (!isAllowedIdentity(identity)) {
      return deny('denied')
    }

    const token = await createSessionToken({
      email: identity.email,
      name: identity.name,
      hd: identity.hd,
    })

    res.statusCode = 302
    res.setHeader('Set-Cookie', [...clearedTemp, sessionCookie(token)])
    res.setHeader('Location', returnTo)
    res.end()
  } catch {
    return deny('error')
  }
}
