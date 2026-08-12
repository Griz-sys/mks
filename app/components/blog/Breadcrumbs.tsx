import Link from 'next/link'

export type Crumb = { name: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-body text-xs uppercase tracking-widest text-ink/40">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-terracotta transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-terracotta">{item.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
