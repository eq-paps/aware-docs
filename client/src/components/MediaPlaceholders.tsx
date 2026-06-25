type MediaPlaceholdersProps = {
  items: string[]
}

export function MediaPlaceholders({ items }: MediaPlaceholdersProps) {
  return (
    <div className="media-placeholders">
      {items.map((item) => (
        <div key={item}>
          <span>Media</span>
          <strong>{item}</strong>
          <small>Pending final asset</small>
        </div>
      ))}
    </div>
  )
}
