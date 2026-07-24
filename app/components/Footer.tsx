import Link from 'next/link'
import Image from 'next/image'
import PillButton from './PillButton'
import {
  ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_PRIMARY, PHONE_PRIMARY_TEL,
  SWIGGY_URL, ZOMATO_URL, INSTAGRAM_URL,
} from '../lib/constants'

const footerLinks = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Find Us', href: '/#location' },
  { label: 'Tandoori Chicken, Noida', href: '/tandoori-chicken-noida-sector-75' },
  { label: 'Chicken Biryani', href: '/chicken-biryani-noida' },
  { label: 'Soya Chaap, Noida', href: '/soya-chaap-noida' },
  { label: 'Chicken Roll, Noida', href: '/chicken-roll-noida' },
  { label: 'Kati Roll, Noida', href: '/kati-roll-noida' },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="absolute inset-0 opacity-15">
        <Image src="/l-intro-1607603831.jpg" alt="" fill className="object-cover" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/Artboard%201%20copy.svg" alt="MK's Tandoori logo" width={56} height={56} className="w-14 h-14 object-contain" />
            <div>
              <p className="font-heading text-2xl tracking-wide">MK&apos;s</p>
              <p className="font-body text-xs uppercase tracking-widest text-paper/50 -mt-1">Real Roasted</p>
            </div>
          </div>
          <p className="font-body text-sm text-paper/60 max-w-xs">
            It&apos;s roasted, not fried. Bite it, love it.
          </p>
          {/* FSSAI placeholder badge — swap for the real FSSAI logo asset when available */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2">
            <span className="font-body text-[10px] uppercase tracking-widest text-paper/60">FSSAI Certified</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="font-heading text-xl tracking-wide mb-4">Explore</p>
          <nav className="flex flex-col gap-2.5">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="font-body text-sm text-paper/60 hover:text-terracotta transition-colors w-fit">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact + order */}
        <div>
          <p className="font-heading text-lg mb-4">Visit / Order</p>
          <p className="font-body text-sm text-paper/60 leading-relaxed">
            {ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}
          </p>
          <a href={PHONE_PRIMARY_TEL} className="font-heading text-xl tracking-wide text-paper hover:text-terracotta transition-colors mt-2 inline-block">
            {PHONE_PRIMARY}
          </a>
          <div className="flex flex-wrap gap-2 mt-5">
            <PillButton href={SWIGGY_URL} variant="swiggy" size="sm">Swiggy</PillButton>
            <PillButton href={ZOMATO_URL} variant="zomato" size="sm">Zomato</PillButton>
            <PillButton href={INSTAGRAM_URL} variant="outline" size="sm" className="!border-paper/40 !text-paper hover:!bg-paper hover:!text-ink">
              Instagram
            </PillButton>
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-paper/40">© {new Date().getFullYear()} MK&apos;s Tandoori. All rights reserved.</p>
          <p className="font-body text-xs text-paper/40">Sector 75, Noida</p>
        </div>
      </div>
    </footer>
  )
}
