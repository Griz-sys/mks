import type { Metadata } from 'next'
import Image from 'next/image'
import PillButton from './components/PillButton'
import MenuTabs from './components/MenuTabs'
import SpecialsSlider from './components/SpecialsSlider'
import { MENU } from './lib/menu'
import { SPECIALS } from './lib/specials'
import {
  SWIGGY_URL, ZOMATO_URL, INSTAGRAM_URL,
  PHONE_PRIMARY, PHONE_PRIMARY_TEL, PHONE_SECONDARY, PHONE_SECONDARY_TEL,
  ADDRESS_LINE_1, ADDRESS_LINE_2, MAPS_QUERY_URL, HOURS,
} from './lib/constants'

export const metadata: Metadata = {
  title: "MK's Tandoori Chicken — Real Roasted | Sector 75, Noida",
  alternates: { canonical: 'https://www.mkstandoori.in' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "MK's Tandoori Chicken",
  description: "It's roasted, not fried. Tandoori chicken, rolls & soya chaap in Noida Sector 75.",
  url: 'https://www.mkstandoori.in',
  telephone: PHONE_SECONDARY_TEL.replace('tel:', ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS_LINE_1,
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '11:00', closes: '23:00',
  }],
  servesCuisine: 'Indian',
  priceRange: '₹₹',
}

const FEATURES = [
  {
    title: 'Clay Tandoor Roasted',
    desc: '450°C, every single day',
    icon: (
      <path d="M8 38c0-12 4-20 8-20s8 8 8 20M10 20c0-8 3-14 6-14s6 6 6 14" strokeLinecap="round" />
    ),
  },
  {
    title: 'Fresh, Not Frozen',
    desc: 'Marinated overnight, hand-rolled to order',
    icon: (
      <path d="M6 14h20M6 22h20M6 30h14M12 6l2 4M20 6l-2 4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Swiggy & Zomato',
    desc: 'Delivered fast across Sector 75',
    icon: (
      <path d="M4 24l4-12h16l4 12M4 24h24M4 24v4h24v-4M10 28a2 2 0 104 0M22 28a2 2 0 104 0" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — full-bleed photo + big terracotta circle, Crafto-style
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-14 px-5">
        <Image
          src="/l-intro-1607603831.jpg"
          alt="Chicken sizzling over the open tandoor flame at MK's"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink/35" />

        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-8">
          <h1 className="sr-only">Real Roasted — It&apos;s Roasted Not Fried</h1>

          {/* Big circle — mascot badge */}
          <div className="relative w-[94vw] max-w-[680px] aspect-square">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/mascot-badge.png"
                alt="It's Roasted Not Fried — MK's mascot holding a tandoori roll, standing on the packaging's spotted pattern"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Small badge — actual MK's logo on a brown circle */}
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-32 h-32 md:w-44 md:h-44 drop-shadow-xl rounded-full bg-ink flex items-center justify-center p-4">
              <Image
                src="/MKs-Logo.svg"
                alt="MK's Tandoori Chicken logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <PillButton href="/#menu" variant="dark" size="md">
            View Menu
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PillButton>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURE STRIP — 3 icon columns, Crafto-style
      ══════════════════════════════════════════════════════════════════ */}
      <section className="px-5 md:px-10 py-12 md:py-16 border-b border-ink/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/10">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-3 py-6 sm:py-0 px-4">
              <svg viewBox="0 0 32 40" className="w-9 h-9 text-terracotta" fill="none" stroke="currentColor" strokeWidth="2.2">
                {f.icon}
              </svg>
              <p className="font-heading text-2xl text-ink tracking-wide leading-none">{f.title}</p>
              <p className="font-body text-ink/50 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT / STORY — circular photo crops + ghost watermark text
      ══════════════════════════════════════════════════════════════════ */}
      <section id="story" className="relative px-5 md:px-10 py-20 md:py-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 md:top-10 text-center pointer-events-none select-none overflow-hidden whitespace-nowrap"
        >
          <span className="font-heading text-ink/[0.05]" style={{ fontSize: 'clamp(6rem, 20vw, 15rem)' }}>
            ROASTED ROASTED
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="relative h-[340px] md:h-[440px] flex items-center justify-center order-2 md:order-1">
            <div className="absolute left-2 md:left-6 w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-paper">
              <Image src="/l-intro-1607603831.jpg" alt="Chicken sizzling over the open tandoor flame" fill className="object-cover" />
            </div>
            <div className="absolute right-0 top-0 md:top-4 w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl border-8 border-paper">
              <Image src="/biryani.avif" alt="Slow-cooked dum chicken biryani" fill className="object-cover" />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="eyebrow mb-5">Bite It, Love It</p>
            <h2 className="font-heading font-normal text-ink leading-[0.95] tracking-wide" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}>
              A proper tandoor.<br />No shortcuts.
            </h2>
            <p className="font-body text-ink/60 text-base md:text-lg mt-5 leading-relaxed max-w-md">
              We roast, we don&apos;t fry — real char, zero shortcuts. Every roll starts with
              chicken marinated overnight and finishes wrapped fresh off the flame.
            </p>
            <div className="flex items-center gap-6 mt-7 flex-wrap">
              <PillButton href="/#menu" variant="primary">See The Menu</PillButton>
              <a href={PHONE_SECONDARY_TEL} className="flex items-center gap-2 font-heading text-2xl text-ink hover:text-terracotta transition-colors tracking-wide">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 3h3l2 5-2.5 1.5a11 11 0 005 5L13 12l5 2v3a2 2 0 01-2 2C8.5 19 1 11.5 1 5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {PHONE_SECONDARY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MENU — tabbed categories
      ══════════════════════════════════════════════════════════════════ */}
      <section id="menu" className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="eyebrow justify-center mb-3">Choose Delicious</p>
            <h2 className="font-heading font-normal text-ink tracking-wide" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Popular Menu
            </h2>
          </div>
          <MenuTabs categories={MENU} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHEF'S PICKS — full-bleed terracotta block, horizontal slider
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-terracotta py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <p className="font-body font-bold text-paper/70 uppercase tracking-widest text-sm mb-3">Specials Choice</p>
              <h2 className="font-heading font-normal text-paper tracking-wide" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                Chef&apos;s Picks
              </h2>
            </div>
            <p className="font-body text-paper/70 max-w-sm">
              The dishes regulars order on repeat — straight from the tandoor to your table.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <SpecialsSlider items={SPECIALS} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE DIVIDER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-paper py-8 md:py-10 overflow-hidden border-y border-ink/10" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center">
              {['Real', 'Roasted', 'Bite It', 'Love It'].map((word, i) => (
                <span
                  key={rep + '-' + word}
                  className="tracking-wide mx-6 md:mx-8"
                  style={
                    i % 2 === 0
                      ? { fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-bebas)', color: 'transparent', WebkitTextStroke: '1.5px #2A2521' }
                      : { fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-bebas)', color: '#2A2521' }
                  }
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow justify-center mb-3">A Peek Inside</p>
            <h2 className="font-heading font-normal text-ink tracking-wide" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { src: '/l-intro-1607603831.jpg', alt: 'Chicken pieces sizzling over the open tandoor flame', tall: true },
              { src: '/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp', alt: 'Grilled tandoori chicken leg piece, char-marked and roasted' },
              { src: '/biryani.avif', alt: "Slow-cooked dum chicken biryani, MK's Noida" },
              { src: '/images.jpg', alt: 'Creamy tandoori chicken plated fresh' },
              { src: '/butterflied_tandoori_chicken_passage_to_india.jpeg', alt: 'Butterflied tandoori chicken fresh from the clay oven', tall: true },
            ].map((img) => (
              <div
                key={img.src}
                className={`relative rounded-3xl overflow-hidden ${img.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BY THE NUMBERS — honest facts, styled like a stat/quote strip
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-ink py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6">
          <blockquote className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-terracotta flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-paper" fill="currentColor">
                <path d="M9.5 6C6.5 7.2 5 9.6 5 12.5c.6-.4 1.3-.6 2-.6 1.8 0 3.2 1.4 3.2 3.2S8.8 18.3 7 18.3c-2.2 0-4-1.8-4-4.5C3 9 5.6 5.3 9.5 4v2zm9 0c-3 1.2-4.5 3.6-4.5 6.5.6-.4 1.3-.6 2-.6 1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2c-2.2 0-4-1.8-4-4.5 0-3.8 2.6-7.5 6.5-8.8v2z" />
              </svg>
            </div>
            <p className="font-heading text-paper tracking-wide leading-[1.1]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              &ldquo;You crave the roast? We crave your feedback.&rdquo;
            </p>
            <p className="font-body text-terracotta text-sm uppercase tracking-widest mt-4">— MK&apos;s Tandoori Chicken</p>
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center">
            {[
              { stat: '450°C', label: 'Clay tandoor heat' },
              { stat: '12+ hrs', label: 'Overnight marinade' },
              { stat: '0', label: 'Deep fryers used' },
              { stat: '11–11', label: 'Open every day' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-terracotta tracking-wide" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{s.stat}</p>
                <p className="font-body text-paper/50 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LOCATION & CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="location" className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <p className="eyebrow mb-3">Come Say Hi</p>
            <h2 className="font-heading font-normal text-ink mb-8 tracking-wide" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Find MK&apos;s
            </h2>

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-body font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Address</p>
                <p className="font-body text-ink text-base leading-relaxed">{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</p>
              </div>
              <div>
                <p className="font-body font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Phone</p>
                <a href={PHONE_PRIMARY_TEL} className="font-heading text-2xl text-ink hover:text-terracotta transition-colors block tracking-wide">{PHONE_PRIMARY}</a>
                <a href={PHONE_SECONDARY_TEL} className="font-heading text-2xl text-ink hover:text-terracotta transition-colors block tracking-wide">{PHONE_SECONDARY}</a>
              </div>
              <div>
                <p className="font-body font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Hours</p>
                <p className="font-body text-ink text-base">{HOURS}</p>
              </div>
            </div>

            <PillButton href={MAPS_QUERY_URL} variant="primary" size="md" className="mt-8">
              Get Directions
            </PillButton>

            {/* Feedback QR block */}
            <div className="mt-10 rounded-3xl bg-tint/40 p-6 flex items-center gap-5 max-w-md">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-paper flex-shrink-0 border border-ink/10">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(INSTAGRAM_URL)}`}
                  alt="QR code — scan to follow MK's and leave feedback"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <p className="font-heading text-lg text-ink leading-tight tracking-wide">
                You crave the roast?<br /><span className="text-terracotta">We crave your feedback.</span>
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-4xl overflow-hidden min-h-[340px] shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.6!2d77.3591!3d28.5745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzI4LjIiTiA3N8KwMjEnMzIuOCJF!5e0!3m2!1sen!2sin!4v1234"
              width="100%" height="100%"
              style={{ border: 0, minHeight: 340 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MK's Tandoori Chicken — Spectrum Metro Mall, Sector 75, Noida"
            />
          </div>
        </div>
      </section>
    </>
  )
}
