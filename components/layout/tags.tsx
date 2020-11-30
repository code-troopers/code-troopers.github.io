export function Tags({ tags, className = 'tags' }: { tags: string[]; className?: string }) {
  return (
    <ul className={className}>
      {tags.map((tag) => (
        <li key={tag} className={className === 'tags' ? null : tag.toLowerCase()}>
          {className === 'tags' ? (
            <a href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a>
          ) : (
            <span>{tag}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
