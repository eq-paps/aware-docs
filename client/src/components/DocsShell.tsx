import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useSearchParams } from 'react-router'
import { useAuth } from '../auth/authContext'
import { docs } from '../data/docs'
import { orderedNavGroups } from '../data/nav'

export function DocsShell() {
  const [query, setQuery] = useState('')
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const auth = useAuth()
  const authNotice = searchParams.get('auth')

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []

    // Search covers public docs only — internal bodies aren't in the bundle.
    return docs.filter((doc) =>
      [
        doc.title,
        doc.summary,
        doc.group,
        doc.label,
        ...doc.media.map((item) =>
          typeof item === 'string' ? item : `${item.title} ${item.note ?? ''}`,
        ),
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [query])

  return (
    <div className="docs-app">
      <aside className="docs-sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark">A</span>
          <span>
            <strong>Aware Docs</strong>
            <small>Equature</small>
          </span>
        </Link>

        <label className="global-search">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs..."
            type="search"
            value={query}
          />
        </label>

        {query.trim() ? (
          <div className="search-results">
            <span className="nav-label">{searchResults.length} results</span>
            {searchResults.map((doc) => (
              <Link key={doc.path} onClick={() => setQuery('')} to={doc.path}>
                <strong>{doc.label}</strong>
                <small>{doc.group}</small>
              </Link>
            ))}
            {searchResults.length === 0 ? (
              <p>No matching placeholder docs yet.</p>
            ) : null}
          </div>
        ) : (
          <nav className="docs-nav" aria-label="Documentation">
            <NavLink end to="/">
              Overview
            </NavLink>
            {orderedNavGroups.map(([group, groupDocs]) => (
              <div className="nav-group" key={group}>
                <span className="nav-label">{group}</span>
                {groupDocs.map((doc) => (
                  <NavLink key={doc.path} to={doc.path}>
                    <span>{doc.label}</span>
                    {doc.access === 'internal' ? (
                      <span
                        className="nav-lock"
                        aria-label="Internal — sign-in required"
                        title="Internal — sign-in required"
                      >
                        🔒
                      </span>
                    ) : null}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        )}

        <div className="launch-note">
          <span>Launch target</span>
          <strong>August 2026</strong>
          <p>Use placeholders until source procedures, images, and video are ready.</p>
        </div>
      </aside>

      <div className="docs-main">
        <header className="topbar">
          <span>{location.pathname === '/' ? 'Overview' : 'Article'}</span>
          <div className="topbar-actions">
            <Link to="/authoring/media-guidelines">Media guidelines</Link>
            {auth.status === 'authenticated' ? (
              <span className="auth-status">
                <span className="auth-email">{auth.user.email}</span>
                <button className="auth-link" onClick={auth.signOut} type="button">
                  Sign out
                </button>
              </span>
            ) : auth.status === 'anonymous' ? (
              <button
                className="auth-link"
                onClick={() => auth.signIn()}
                type="button"
              >
                Staff sign in
              </button>
            ) : null}
          </div>
        </header>

        {authNotice === 'denied' ? (
          <div className="auth-banner" role="alert">
            That account isn’t an @equature.com Google account, so it can’t access
            internal docs.
          </div>
        ) : authNotice === 'error' || authNotice === 'invalid_request' ? (
          <div className="auth-banner" role="alert">
            Sign-in didn’t complete. Please try again.
          </div>
        ) : null}

        <Outlet />
      </div>
    </div>
  )
}
