'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { MenuCategory, MenuItem } from '../lib/menu'

const TAB_ICONS: Record<string, React.ReactNode> = {
  tikka: <path d="M4 36L28 4M10 22a4 4 0 106-6M15 16a4 4 0 106-6M5 30a4 4 0 106-6" strokeLinecap="round" strokeLinejoin="round" />,
  chicken: <path d="M8 38c0-12 4-20 8-20s8 8 8 20M10 20c0-8 3-14 6-14s6 6 6 14" strokeLinecap="round" />,
  chaap: <path d="M16 6c6 4 8 10 8 15a8 8 0 11-16 0c0-5 2-11 8-15z" strokeLinecap="round" strokeLinejoin="round" />,
  rolls: <path d="M6 14c8-4 12-4 20 0M6 14l3 18h14l3-18M6 14l10-8 10 8" strokeLinecap="round" strokeLinejoin="round" />,
  bowls: <path d="M3 18h26a13 13 0 01-26 0zM10 12c0-3 2-3 2-6M16 12c0-3 2-3 2-6M22 12c0-3 2-3 2-6M11 31h10" strokeLinecap="round" strokeLinejoin="round" />,
  combos: <path d="M4 24h24M6 24a10 10 0 0120 0M16 14v-2M3 30h26" strokeLinecap="round" strokeLinejoin="round" />,
  addons: <path d="M10 6h12l-1.5 26a2 2 0 01-2 2h-5a2 2 0 01-2-2L10 6zM8 6h16" strokeLinecap="round" strokeLinejoin="round" />,
}

export default function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12 md:mb-16">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className="flex flex-col items-center gap-2.5 group"
          >
            <svg
              viewBox="0 0 32 40"
              className={`w-8 h-8 transition-colors ${i === active ? 'text-terracotta' : 'text-ink/30 group-hover:text-ink/60'}`}
              fill="none" stroke="currentColor" strokeWidth="2.2"
            >
              {TAB_ICONS[c.id]}
            </svg>
            <span className={`font-heading text-sm md:text-base transition-colors pb-1 border-b-2 ${
              i === active ? 'text-ink font-bold border-terracotta' : 'text-ink/40 border-transparent group-hover:text-ink/70'
            }`}>
              {c.title}
            </span>
          </button>
        ))}
      </div>

      {categories.map((cat, catIdx) => {
        const withPhoto = cat.image ? [] : cat.items.filter((item) => item.image)
        const listed = cat.image ? cat.items : cat.items.filter((item) => !item.image)
        return (
          <div key={cat.id} className={catIdx === active ? '' : 'hidden'}>
            {cat.image ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <Image src={cat.image} alt={`${cat.title} at MK's Tandoori`} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
                </div>
                <MenuList items={listed} />
              </div>
            ) : (
              <>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {withPhoto.map((item) => <MenuCard key={item.name} item={item} />)}
                </div>
                {listed.length > 0 && (
                  <div className="max-w-2xl mx-auto mt-10 md:mt-14">
                    <MenuList items={listed} />
                  </div>
                )}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image!}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <h3 className="font-heading text-xl md:text-2xl text-ink tracking-wide leading-tight">{item.name}</h3>
        <p className="font-body text-ink/55 text-sm leading-relaxed">{item.desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {item.prices.map((p) => (
            <span key={p.label + p.price} className="inline-flex items-baseline gap-1.5 rounded-full bg-tint/40 px-3 py-1">
              {p.label && <span className="font-body text-ink/60 text-xs">{p.label}</span>}
              <span className="font-body font-bold text-terracotta text-base md:text-lg">{p.price}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-body font-bold text-ink text-sm md:text-base leading-snug">{item.name}</h3>
            <span className="flex-1 min-w-[10px] border-b border-dotted border-ink/25 translate-y-[-2px]" />
            <span className="font-body font-bold text-terracotta text-lg md:text-xl tracking-wide whitespace-nowrap flex-shrink-0">
              {item.prices.map((p) => (p.label ? `${p.label} ${p.price}` : p.price)).join(' · ')}
            </span>
          </div>
          <p className="font-body text-ink/45 text-xs md:text-sm mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
