import { createContext, useContext } from 'react'

export type AuthUser = { email: string; name: string | null }

export type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'authenticated'; user: AuthUser }
  | { status: 'anonymous'; user: null }

export type AuthContextValue = AuthState & {
  /** Redirect to Google sign-in, returning to `returnTo` afterwards. */
  signIn: (returnTo?: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
