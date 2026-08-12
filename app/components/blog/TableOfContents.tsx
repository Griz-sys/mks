'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/app/lib/blog/types'

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-100px 0px -70% 0px' }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-heading text-sm uppercase tracking-widest text-ink/40 mb-3">
        Table of Contents
      </p>
      <ul className="space-y-2 text-sm font-body">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.depth === 3 ? '1rem' : 0 }}>
            <a
              href={`#${item.id}`}
              className={`block py-0.5 transition-colors ${
                activeId === item.id ? 'text-terracotta font-semibold' : 'text-ink/60 hover:text-terracotta'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
