import { useEffect, useState } from 'react'
import { useAuth } from '../auth/authContext'
import type { DocNavItem, DocSection } from '../data/docTypes'
import { DocPage } from './DocPage'

type FetchState =
  | { status: 'idle' | 'loading' }
  | { status: 'loaded'; doc: DocSection }
  | { status: 'unauthorized' }
  | { status: 'error' }

/**
 * Renders an auth-gated doc. The body isn't in the bundle — when the visitor is
 * a signed-in @equature.com user we fetch it from the protected API; otherwise
 * we show a sign-in gate. The lock is enforced server-side; this is the UX.
 */
export function ProtectedDocPage({ item }: { item: DocNavItem }) {
  const auth = useAuth()
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'idle' })

  useEffect(() => {
    if (auth.status !== 'authenticated') return
    let active = true
    setFetchState({ status: 'loading' })
    const slug = item.path.replace(/^\//, '')
    fetch(`/api/internal-docs?slug=${encodeURIComponent(slug)}`, {
      credentials: 'same-origin',
    })
      .then(async (res) => {
        if (!active) return
        if (res.status === 401) return setFetchState({ status: 'unauthorized' })
        if (!res.ok) return setFetchState({ status: 'error' })
        const doc = (await res.json()) as DocSection
        setFetchState({ status: 'loaded', doc })
      })
      .catch(() => {
        if (active) setFetchState({ status: 'error' })
      })
    return () => {
      active = false
    }
  }, [auth.status, item.path])

  if (auth.status === 'loading') {
    return <Gate item={item} message="Checking your access…" busy />
  }

  if (auth.status === 'anonymous' || fetchState.status === 'unauthorized') {
    return (
      <Gate
        item={item}
        message="This is internal Equature documentation. Sign in with your @equature.com Google account to view it."
        onSignIn={() => auth.signIn(item.path)}
      />
    )
  }

  if (fetchState.status === 'loaded') {
    return <DocPage doc={fetchState.doc} />
  }

  if (fetchState.status === 'error') {
    return (
      <Gate
        item={item}
        message="Something went wrong loading this internal document. Please try again."
        onSignIn={() => auth.signIn(item.path)}
        signInLabel="Retry"
      />
    )
  }

  return <Gate item={item} message="Loading…" busy />
}

function Gate({
  item,
  message,
  onSignIn,
  signInLabel = 'Sign in with Google',
  busy = false,
}: {
  item: DocNavItem
  message: string
  onSignIn?: () => void
  signInLabel?: string
  busy?: boolean
}) {
  return (
    <main className="doc-content">
      <header className="doc-header">
        <div>
          <p className="eyebrow">{item.group}</p>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
        </div>
      </header>
      <div className="auth-gate">
        <span className="auth-gate-lock" aria-hidden="true">
          🔒
        </span>
        <p>{message}</p>
        {onSignIn ? (
          <button className="auth-button" onClick={onSignIn} type="button" disabled={busy}>
            {signInLabel}
          </button>
        ) : null}
      </div>
    </main>
  )
}
