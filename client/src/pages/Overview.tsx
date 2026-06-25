import { Link } from 'react-router'
import { StatusBadge } from '../components/StatusBadge'
import { docs } from '../data/docs'

export function Overview() {
  return (
    <main className="doc-content">
      <header className="doc-header overview-header">
        <div>
          <p className="eyebrow">Aware documentation</p>
          <h1>Customer-ready operating instructions for Aware.</h1>
          <p>
            This documentation app is organized like a technical reference: clear
            navigation, focused procedures, status labels, and media placeholders
            for source material that will be added before launch.
          </p>
        </div>
        <div className="version-panel">
          <span>Version</span>
          <strong>Launch draft</strong>
          <small>August 2026 target</small>
        </div>
      </header>

      <section className="quick-grid" aria-label="Core documentation sections">
        {docs.slice(0, 5).map((doc) => (
          <Link className="quick-card" key={doc.path} to={doc.path}>
            <span>{doc.group}</span>
            <strong>{doc.title}</strong>
            <p>{doc.summary}</p>
          </Link>
        ))}
      </section>

      <section className="reference-block">
        <h2>Documentation structure</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.path}>
                  <td>
                    <Link to={doc.path}>{doc.title}</Link>
                  </td>
                  <td>{doc.summary}</td>
                  <td>
                    <StatusBadge status={doc.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
