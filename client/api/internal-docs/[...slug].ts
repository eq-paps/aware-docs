import type { VercelRequest, VercelResponse } from '@vercel/node'
import { internalDocBySlug } from '../_data/internalDocs.js'
import { readCookie, SESSION_COOKIE, verifySessionToken } from '../_lib/session.js'

/**
 * GET /api/internal-docs/<group>/<slug> — serves a gated procedure body.
 *
 * The edge middleware already blocks unauthenticated requests, but we verify
 * the session here too (defense in depth): a content endpoint must never rely
 * solely on an upstream gate.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req.headers.cookie, SESSION_COOKIE)
  const claims = token ? await verifySessionToken(token) : null
  if (!claims) {
    res.status(401).json({ error: 'authentication_required' })
    return
  }

  const parts = req.query.slug
  const slug = Array.isArray(parts) ? parts.join('/') : String(parts ?? '')
  const doc = internalDocBySlug(slug)
  if (!doc) {
    res.status(404).json({ error: 'not_found' })
    return
  }

  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json(doc)
}
