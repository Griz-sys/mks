import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { label: 'MENU',                href: '/#menu' },
  { label: 'TANDOORI CHICKEN',    href: '/tandoori-chicken-noida-sector-75' },
  { label: 'CHICKEN BIRYANI',     href: '/chicken-biryani-noida' },
  { label: 'FAMILY DINING',       href: '/family-restaurant-sector-75-noida' },
  { label: 'OUR STORY',           href: '/#story' },
  { label: 'FIND US',             href: '/#location' },
]

export default function Footer() {
  return (
    <footer>
      {/* ── Pre-footer: sunburst with massive type ─────────────────────── */}
      <div className="sunburst py-24 text-center px-6 overflow-hidden">
        <p
          className="font-poster text-mk-orange uppercase leading-none"
          style={{ fontSize: 'clamp(4rem, 16vw, 16rem)' }}
        >
          MK&apos;S
        </p>
        <p
          className="font-poster text-mk-black uppercase tracking-widest leading-none mt-2"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 4rem)' }}
        >
          TANDOORI CHICKEN · NOIDA
        </p>
        <p className="font-hindi text-mk-black/30 text-xl mt-3">
          तंदूरी चिकन · नोएडा
        </p>
        <div className="mt-8 space-y-1">
          <p className="font-body text-mk-black/50 text-xs uppercase tracking-widest">
            SPECTRUM MALL, SECTOR 50, NOIDA · UTTAR PRADESH 201301
          </p>
          <p className="font-body text-mk-black/50 text-xs uppercase tracking-widest">
            +91 77973 39211 &nbsp;·&nbsp; MON – SUN &nbsp;·&nbsp; 11AM – 11PM
          </p>
        </div>
      </div>

      {/* ── Footer bar: solid black ────────────────────────────────────── */}
      <div className="bg-mk-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label="MK's Home" className="flex-shrink-0">
            <Image src="/MKs-Logo.svg" alt="MK's" width={36} height={36} />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-poster text-white/50 text-xs uppercase tracking-widest hover:text-mk-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-body text-white/20 text-xs uppercase tracking-widest flex-shrink-0">
            © {new Date().getFullYear()} MK&apos;S
          </p>
        </div>
      </div>
    </footer>
  )
}
