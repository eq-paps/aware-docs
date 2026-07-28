import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildAuthUrl } from '../../_lib/google.js'
import { requestOrigin, safeReturnTo } from '../../_lib/http.js'

const STATE_COOKIE = 'aware_oauth_state'
const RETURN_COOKIE = 'aware_oauth_return'
const TEMP_MAX_AGE = 60 * 10 // 10 minutes to complete the round-trip

/** GET /api/auth/google/start — kicks off the Google sign-in redirect. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = requestOrigin(req)
  const redirectUri = `${origin}/api/auth/google/callback`
  const returnTo = safeReturnTo(
    typeof req.query.returnTo === 'string' ? req.query.returnTo : undefined,
  )

  // CSRF protection: random state echoed back by Google and matched on callback.
  const state = crypto.randomUUID()

  res.setHeader('Set-Cookie', [
    `${STATE_COOKIE}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${TEMP_MAX_AGE}`,
    `${RETURN_COOKIE}=${encodeURIComponent(returnTo)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${TEMP_MAX_AGE}`,
  ])
  res.statusCode = 302
  res.setHeader('Location', buildAuthUrl(redirectUri, state))
  res.end()
}
