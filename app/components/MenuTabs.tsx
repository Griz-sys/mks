'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { MenuCategory } from '../lib/menu'

const ITEM_IMAGES = [
  '/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp',
  '/butterflied_tandoori_chicken_passage_to_india.jpeg',
  '/l-intro-1607603831.jpg',
  '/images.jpg',
  '/biryani.avif',
]

const TAB_ICONS: Record<string, React.ReactNode> = {
  chicken: <path d="M8 38c0-12 4-20 8-20s8 8 8 20M10 20c0-8 3-14 6-14s6 6 6 14" strokeLinecap="round" />,
  chaap: <path d="M16 6c6 4 8 10 8 15a8 8 0 11-16 0c0-5 2-11 8-15z" strokeLinecap="round" strokeLinejoin="round" />,
  rolls: <path d="M6 14c8-4 12-4 20 0M6 14l3 18h14l3-18M6 14l10-8 10 8" strokeLinecap="round" strokeLinejoin="round" />,
  beverages: <path d="M10 6h12l-1.5 26a2 2 0 01-2 2h-5a2 2 0 01-2-2L10 6zM8 6h16" strokeLinecap="round" strokeLinejoin="round" />,
}

export default function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(0)
  const cat = categories[active]
  const mid = Math.ceil(cat.items.length / 2)
  const columns = [cat.items.slice(0, mid), cat.items.slice(mid)]

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12 md:mb-16">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            className="flex flex-col items-center gap-2.5 group"
          >
            <svg
              viewBox="0 0 32 40"
              className={`w-8 h-8 transition-colors ${i === active ? 'text-terracotta' : 'text-ink/30 group-hover:text-ink/60'}`}
              fill="none" stroke="currentColor" strokeWidth="2.2"
            >
              {TAB_ICONS[c.id]}
            </svg>
            <span className={`font-body text-sm md:text-base transition-colors pb-1 border-b-2 ${
              i === active ? 'text-ink font-bold border-terracotta' : 'text-ink/40 border-transparent group-hover:text-ink/70'
            }`}>
              {c.title}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-7">
            {col.map((item, i) => {
              const imgIndex = colIdx * mid + i
              return (
                <div key={item.name} className="flex items-center gap-4">
                  {cat.id === 'beverages' ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex-shrink-0 shadow-md bg-tint/50 flex items-center justify-center">
                      <svg viewBox="0 0 32 40" className="w-6 h-6 md:w-7 md:h-7 text-terracotta" fill="none" stroke="currentColor" strokeWidth="2.2">
                        {TAB_ICONS.beverages}
                      </svg>
                    </div>
                  ) : (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                      <Image src={ITEM_IMAGES[imgIndex % ITEM_IMAGES.length]} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-body font-bold text-ink text-sm md:text-base leading-snug">{item.name}</h4>
                      <span className="flex-1 min-w-[10px] border-b border-dotted border-ink/25 translate-y-[-2px]" />
                      <span className="font-heading text-terracotta text-lg md:text-xl tracking-wide whitespace-nowrap flex-shrink-0">
                        {item.prices.map((p) => (p.label ? `${p.label} ${p.price}` : p.price)).join(' · ')}
                      </span>
                    </div>
                    <p className="font-body text-ink/45 text-xs md:text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
