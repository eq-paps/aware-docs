import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { docs, navGroups } from '../data/docs'

export function DocsShell() {
  const [query, setQuery] = useState('')
  const location = useLocation()

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []

    return docs.filter((doc) =>
      [doc.title, doc.summary, doc.group, doc.label, ...doc.media]
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
            {Object.entries(navGroups).map(([group, groupDocs]) => (
              <div className="nav-group" key={group}>
                <span className="nav-label">{group}</span>
                {groupDocs.map((doc) => (
                  <NavLink key={doc.path} to={doc.path}>
                    {doc.label}
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
          <Link to="/media-guidelines">Media guidelines</Link>
        </header>
        <Outlet />
      </div>
    </div>
  )
}
