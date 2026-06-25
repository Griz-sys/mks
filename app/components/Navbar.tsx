'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-mk-black border-b border-white/10">
      <nav className="flex items-center justify-between px-6 h-16">

        {/* LEFT — Logo */}
        <Link href="/" aria-label="MK's Home" className="flex-shrink-0">
          <Image
            src="/MKs-Logo.svg"
            alt="MK's Tandoori Chicken"
            width={48}
            height={48}
            priority
          />
        </Link>

        {/* CENTER — Ghost outline buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#location"
            className="font-poster text-white text-sm uppercase tracking-widest border border-white/40 px-5 py-2 hover:bg-white hover:text-mk-black transition-colors duration-200"
          >
            DINE IN
          </a>
          <a
            href="tel:+917797339211"
            className="font-poster text-white text-sm uppercase tracking-widest border border-white/40 px-5 py-2 hover:bg-white hover:text-mk-black transition-colors duration-200"
          >
            ORDER NOW
          </a>
        </div>

        {/* RIGHT — Filled orange CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+917797339211"
            className="font-poster text-mk-black bg-mk-orange text-sm uppercase tracking-widest px-6 py-2 hover:bg-white transition-colors duration-200"
          >
            CATERING
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 w-6 bg-white transition-all duration-300
                ${i === 0 && open ? 'rotate-45 translate-y-2' : ''}
                ${i === 1 && open ? 'opacity-0' : ''}
                ${i === 2 && open ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-mk-black border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {[
            { label: 'MENU',         href: '/#menu' },
            { label: 'DINE IN',      href: '/#location' },
            { label: 'ORDER NOW',    href: 'tel:+917797339211' },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-poster text-white text-lg uppercase tracking-widest hover:text-mk-orange transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+917797339211"
            className="font-poster text-mk-black bg-mk-orange text-sm uppercase tracking-widest px-5 py-2 self-start"
          >
            CATERING
          </a>
        </div>
      </div>
    </header>
  )
}
