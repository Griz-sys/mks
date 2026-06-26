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
        <div className="relative mx-auto" style={{ width: 'clamp(260px, 50vw, 700px)', height: 'clamp(100px, 18vw, 260px)' }}>
          <Image
            src="/logo_mk_light-removebg-preview.svg"
            alt="MK's Tandoori Chicken Noida"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-8 space-y-1">
          <p className="font-body text-mk-black/50 text-xs uppercase tracking-widest">
            SHOP NO. 33, E BLOCK, SPECTRUM METRO MALL, PHASE-2, SECTOR 75, NOIDA
          </p>
          <p className="font-body text-mk-black/50 text-xs uppercase tracking-widest">
            +91 80763 74624 &nbsp;·&nbsp; MON – SUN &nbsp;·&nbsp; 11AM – 11PM
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
