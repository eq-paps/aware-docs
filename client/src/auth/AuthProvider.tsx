import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue, type AuthState } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading', user: null })

  useEffect(() => {
    let active = true
    fetch('/api/auth/session', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data: { authenticated: boolean; email?: string; name?: string | null }) => {
        if (!active) return
        setState(
          data.authenticated && data.email
            ? {
                status: 'authenticated',
                user: { email: data.email, name: data.name ?? null },
              }
            : { status: 'anonymous', user: null },
        )
      })
      .catch(() => {
        if (active) setState({ status: 'anonymous', user: null })
      })
    return () => {
      active = false
    }
  }, [])

  const signIn = useCallback((returnTo?: string) => {
    const target = returnTo ?? window.location.pathname
    window.location.href = `/api/auth/google/start?returnTo=${encodeURIComponent(target)}`
  }, [])

  const signOut = useCallback(() => {
    window.location.href = '/api/auth/logout?returnTo=/'
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, signIn, signOut }),
    [state, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
