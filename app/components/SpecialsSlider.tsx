import Image from 'next/image'
import type { Special } from '../lib/specials'

export default function SpecialsSlider({ items }: { items: Special[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:-mx-10 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <div
          key={item.name}
          className="snap-start flex-shrink-0 w-64 md:w-72 rounded-3xl bg-paper overflow-hidden shadow-xl"
        >
          <div className="relative aspect-square">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
            <span className="absolute top-3 right-3 rounded-full bg-ink text-paper font-heading text-sm tracking-wide px-4 py-1.5">
              {item.price}
            </span>
          </div>
          <div className="p-5">
            <h4 className="font-heading text-2xl text-ink tracking-wide leading-none">{item.name}</h4>
            <p className="font-hindi text-ink/35 text-xs mt-1.5">{item.nameHindi}</p>
            <p className="font-body text-ink/50 text-xs uppercase tracking-widest mt-3">{item.tags}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
