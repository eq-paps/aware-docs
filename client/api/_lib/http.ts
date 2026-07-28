import type { VercelRequest } from '@vercel/node'

/** Reconstruct the public origin (protocol + host) behind Vercel's proxy. */
export const requestOrigin = (req: VercelRequest): string => {
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https'
  const host =
    (req.headers['x-forwarded-host'] as string) || (req.headers.host as string)
  return `${proto}://${host}`
}

/**
 * Only allow same-site, path-only redirect targets. Prevents an attacker from
 * turning the login flow into an open redirect via ?returnTo=https://evil.com.
 */
export const safeReturnTo = (value: string | undefined | null): string => {
  if (!value) return '/'
  if (!value.startsWith('/') || value.startsWith('//')) return '/'
  return value
}
