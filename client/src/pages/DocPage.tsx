import { MediaPlaceholders } from '../components/MediaPlaceholders'
import { StatusBadge } from '../components/StatusBadge'
import type { DocSection } from '../data/docs'
import { slugify } from '../utils/slugify'

type DocPageProps = {
  doc: DocSection
}

export function DocPage({ doc }: DocPageProps) {
  return (
    <main className="doc-content">
      <header className="doc-header">
        <div>
          <p className="eyebrow">{doc.group}</p>
          <h1>{doc.title}</h1>
          <p>{doc.summary}</p>
        </div>
        <dl className="doc-meta">
          <div>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={doc.status} />
            </dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{doc.updated}</dd>
          </div>
        </dl>
      </header>

      <div className="doc-layout">
        <article className="article-body">
          {doc.body.map((section) => (
            <section id={slugify(section.heading)} key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.code ? <pre>{section.code}</pre> : null}
            </section>
          ))}

          <section id="media-placeholders">
            <h2>Media placeholders</h2>
            <p>
              Add screenshots, Mux embeds, store badges, or downloadable files
              where they help a user complete the task without leaving the page.
            </p>
            <MediaPlaceholders items={doc.media} />
          </section>
        </article>

        <aside className="toc" aria-label="On this page">
          <span>On this page</span>
          {doc.body.map((section) => (
            <a href={`#${slugify(section.heading)}`} key={section.heading}>
              {section.heading}
            </a>
          ))}
          <a href="#media-placeholders">Media placeholders</a>
        </aside>
      </div>
    </main>
  )
}
