import { next } from '@vercel/edge'
import { readCookie, SESSION_COOKIE, verifySessionToken } from './api/_lib/session'

/**
 * Edge-enforced gate for the internal docs API. This runs before the function
 * and is the primary access control: unauthenticated requests never reach the
 * gated content. Public docs and the auth endpoints are untouched.
 */
export const config = {
  matcher: '/api/internal-docs/:path*',
}

export default async function middleware(request: Request) {
  const token = readCookie(request.headers.get('cookie'), SESSION_COOKIE)
  const claims = token ? await verifySessionToken(token) : null

  if (!claims) {
    return new Response(JSON.stringify({ error: 'authentication_required' }), {
      status: 401,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    })
  }

  return next()
}
