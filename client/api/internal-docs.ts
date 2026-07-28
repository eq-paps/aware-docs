import type { VercelRequest, VercelResponse } from '@vercel/node'
import { internalDocBySlug } from './_data/internalDocs.js'
import { readCookie, SESSION_COOKIE, verifySessionToken } from './_lib/session.js'

/**
 * GET /api/internal-docs?slug=<group>/<doc> — serves a gated procedure body.
 *
 * Uses a query param rather than a dynamic path segment: Vercel's zero-config
 * /api catch-all routing was unreliable for multi-segment slugs, and a plain
 * function is unambiguously supported.
 *
 * The edge middleware already blocks unauthenticated requests, but we verify
 * the session here too (defense in depth).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req.headers.cookie, SESSION_COOKIE)
  const claims = token ? await verifySessionToken(token) : null
  if (!claims) {
    res.status(401).json({ error: 'authentication_required' })
    return
  }

  const raw = req.query.slug
  const slug = Array.isArray(raw) ? raw.join('/') : (raw ?? '')
  const doc = internalDocBySlug(slug)
  if (!doc) {
    res.status(404).json({ error: 'not_found' })
    return
  }

  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json(doc)
}
