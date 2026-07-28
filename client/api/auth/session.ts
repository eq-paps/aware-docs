import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readCookie, SESSION_COOKIE, verifySessionToken } from '../_lib/session.js'

/**
 * GET /api/auth/session — lets the client learn whether the visitor is signed
 * in (and who they are) so it can decide what to render. Returns no secret
 * doc content; that stays behind /api/internal-docs.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req.headers.cookie, SESSION_COOKIE)
  const claims = token ? await verifySessionToken(token) : null

  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json(
    claims
      ? { authenticated: true, email: claims.email, name: claims.name ?? null }
      : { authenticated: false },
  )
}
