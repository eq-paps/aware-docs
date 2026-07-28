import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clearedSessionCookie } from '../_lib/session'
import { safeReturnTo } from '../_lib/http'

/** GET /api/auth/logout — clears the session cookie and returns home. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const returnTo = safeReturnTo(
    typeof req.query.returnTo === 'string' ? req.query.returnTo : undefined,
  )
  res.statusCode = 302
  res.setHeader('Set-Cookie', clearedSessionCookie())
  res.setHeader('Location', returnTo)
  res.end()
}
