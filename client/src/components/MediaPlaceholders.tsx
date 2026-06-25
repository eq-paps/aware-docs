import type { DocMedia } from '../data/docs'

type MediaPlaceholdersProps = {
  items: DocMedia[]
}

export function MediaPlaceholders({ items }: MediaPlaceholdersProps) {
  return (
    <div className="media-placeholders">
      {items.map((item) => (
        <div key={typeof item === 'string' ? item : item.src}>
          {typeof item === 'string' ? (
            <>
              <span>Media</span>
              <strong>{item}</strong>
              <small>Pending final asset</small>
            </>
          ) : (
            <>
              <img src={item.src} alt={item.alt ?? item.title} loading="lazy" />
              <span>Screenshot</span>
              <strong>{item.title}</strong>
              {item.note ? <small>{item.note}</small> : null}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
