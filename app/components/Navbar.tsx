'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PillButton from './PillButton'
import { SWIGGY_URL, ZOMATO_URL } from '../lib/constants'

const NAV_LINKS = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Location', href: '/#location' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const orderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || mobileOpen

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      solid ? 'bg-paper/90 backdrop-blur-md border-b-2 border-ink/10' : 'bg-transparent border-b-0'
    }`}>
      {/* Dark tint behind the nav so white text/logo stay legible over any hero photo */}
      {!solid && (
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" aria-hidden="true" />
      )}

      <nav className="relative flex items-center justify-between px-5 md:px-8 h-20">
        {/* LEFT — oval logo badge */}
        <Link href="/" aria-label="MK's Home" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src={solid ? '/logo%20dark%20new.svg' : '/Artboard%201%20copy.svg'}
            alt="MK's Tandoori logo"
            width={56}
            height={56}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
            priority
          />
          <div className="hidden sm:flex items-baseline gap-1.5">
            <p className={`font-heading text-2xl tracking-wide transition-colors ${solid ? 'text-ink' : 'text-white'}`}>MK&apos;s</p>
            <p className={`font-heading text-2xl uppercase tracking-wide transition-colors ${solid ? 'text-ink' : 'text-white'}`}>tandoori</p>
          </div>
        </Link>

        {/* CENTER — links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-body font-bold text-sm uppercase tracking-wide transition-colors hover:text-terracotta ${solid ? 'text-ink' : 'text-white'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT — Order Now popover */}
        <div className="relative flex-shrink-0" ref={orderRef}>
          <PillButton onClick={() => setOrderOpen((v) => !v)} size="sm" className="md:!text-sm md:!px-6 md:!py-2.5 uppercase">
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="14" height="13" rx="2" />
              <path d="M3 8h14M7 2v4M13 2v4" strokeLinecap="round" />
            </svg>
            Order Now
          </PillButton>

          {orderOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 rounded-3xl bg-ink p-3 shadow-2xl flex flex-col gap-2 animate-slide-up">
              <PillButton href={SWIGGY_URL} variant="swiggy" size="sm" className="w-full">
                Order on Swiggy
              </PillButton>
              <PillButton href={ZOMATO_URL} variant="zomato" size="sm" className="w-full">
                Order on Zomato
              </PillButton>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 ml-2"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${solid ? 'bg-ink' : 'bg-white'}
                ${i === 0 && mobileOpen ? 'translate-y-1.5' : ''}
                ${i === 1 && mobileOpen ? 'opacity-0' : ''}
                ${i === 2 && mobileOpen ? '-translate-y-1.5' : ''}
              `}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-paper border-t-2 border-ink/10 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-body font-bold text-ink text-lg uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
