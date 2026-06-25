import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "MK's — Best Tandoori Chicken in Noida Sector 75 | It's Roasted, Not Fried",
  alternates: { canonical: 'https://www.mkstandoori.in' },
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FoodCard = {
  type: 'item'
  name: string
  nameHindi: string
  price: string
  image: string
  alt: string
  bg: 'orange' | 'dark'
}
type DividerCard = {
  type: 'divider'
  title: string
  titleHindi: string
}
type MenuCard = FoodCard | DividerCard

// ─── Data ────────────────────────────────────────────────────────────────────
const menuCards: MenuCard[] = [
  { type: 'item',    name: 'TANDOORI CHICKEN', nameHindi: 'तंदूरी चिकन',   price: 'FROM ₹199', image: '/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp', alt: 'Smoking tandoori chicken leg piece fresh off the clay tandoor', bg: 'orange' },
  { type: 'item',    name: 'CHICKEN TIKKA',    nameHindi: 'चिकन टिक्का',   price: '₹249',      image: '/images.jpg',                                                                      alt: 'Tandoori chicken platter with mint chutney and onion rings',    bg: 'dark'   },
  { type: 'divider', title: 'TANDOORI SPECIALS', titleHindi: 'तंदूरी विशेष' },
  { type: 'item',    name: 'SEEKH KEBAB',      nameHindi: 'सीख कबाब',      price: '₹229',      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=85&fit=crop', alt: 'Seekh kebab on skewers',     bg: 'orange' },
  { type: 'item',    name: 'CHICKEN BIRYANI',  nameHindi: 'चिकन बिरयानी',  price: '₹249',      image: '/biryani.avif', alt: 'Chicken biryani',            bg: 'dark'   },
  { type: 'divider', title: 'BIRYANI & ROLLS',  titleHindi: 'बिरयानी और रोल' },
  { type: 'item',    name: 'CHICKEN ROLL',     nameHindi: 'चिकन रोल',      price: '₹149',      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=85&fit=crop', alt: 'Chicken tikka roll',         bg: 'orange' },
  { type: 'item',    name: 'PANEER TIKKA',     nameHindi: 'पनीर टिक्का',   price: '₹199',      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85&fit=crop', alt: 'Paneer tikka in clay bowl',  bg: 'dark'   },
  { type: 'divider', title: 'SIDES & MORE',     titleHindi: 'साइड्स और अधिक' },
]

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "MK's",
  description: "Authentic tandoori chicken in Noida Sector 75 — roasted in a clay tandoor, not fried.",
  url: 'https://www.mkstandoori.in',
  telephone: '+91-7797339211',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Spectrum Mall, Sector 50',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '11:00', closes: '23:00',
  }],
  servesCuisine: 'Indian',
  priceRange: '₹₹',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO — two photos side by side → massive headline → 3-col info
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-16">
        {/* Two editorial photos */}
        <div className="grid grid-cols-2 h-[55vh] min-h-[320px]">
          <div className="relative overflow-hidden">
            <Image
              src="/l-intro-1607603831.jpg"
              alt="Chicken sizzling over open flames — MK's clay tandoor, Noida"
              fill className="object-cover"
              priority
            />
          </div>
          <div className="relative overflow-hidden border-l-2 border-mk-black">
            <Image
              src="/butterflied_tandoori_chicken_passage_to_india.jpeg"
              alt="Butterflied tandoori chicken fresh from the tandoor — MK's Noida Sector 75"
              fill className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Massive full-width headline */}
        <div className="bg-mk-black overflow-hidden">
          <h1
            className="font-poster text-white leading-none uppercase text-center w-full py-3 px-2"
            style={{ fontSize: 'clamp(3rem, 10.5vw, 11rem)', letterSpacing: '-0.01em' }}
          >
            TANDOORI CHICKEN SHOP
          </h1>
        </div>

        {/* 3-column info strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10 bg-mk-black">
          {/* Left — Bold tagline */}
          <div className="px-8 py-10 border-b md:border-b-0 md:border-r border-white/10">
            <p className="font-poster text-white text-4xl lg:text-5xl uppercase leading-tight">
              IT&apos;S ROASTED,<br />NOT FRIED.
            </p>
            <p className="font-hindi text-white/30 text-sm mt-3 text-right">
              भुना हुआ, तला नहीं
            </p>
          </div>

          {/* Center — description */}
          <div className="px-8 py-10 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
            <p className="font-body text-white/50 text-xs uppercase tracking-widest leading-loose">
              Marinated 12 hours. Roasted at 450°C in a clay tandoor. Served fresh off
              the skewer. Zero frying. Every single day, from 11am to 11pm.
            </p>
          </div>

          {/* Right — nav buttons */}
          <div className="px-8 py-10 flex flex-col gap-3 justify-center">
            <a href="#menu"     className="font-poster text-white text-sm uppercase tracking-widest text-center border border-white/30 py-3 px-4 hover:bg-white hover:text-mk-black transition-colors">VIEW MENU</a>
            <a href="#story"    className="font-poster text-white text-sm uppercase tracking-widest text-center border border-white/30 py-3 px-4 hover:bg-white hover:text-mk-black transition-colors">OUR STORY</a>
            <a href="#location" className="font-poster text-mk-black text-sm uppercase tracking-widest text-center bg-mk-orange py-3 px-4 hover:bg-white transition-colors">FIND US</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. TRANSITION BANNER — FROM THE TANDOOR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-orange overflow-hidden" data-scroll>
        <div className="flex items-center justify-between px-8 py-8 gap-6">
          <div>
            <p
              className="font-poster text-white uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
            >
              FROM THE TANDOOR
            </p>
            <p className="font-hindi text-white/60 text-base mt-1 text-right">
              तंदूर से सीधे
            </p>
          </div>
          {/* Clay oven icon */}
          <svg viewBox="0 0 80 100" fill="none" className="w-14 md:w-20 flex-shrink-0 opacity-40" aria-hidden="true">
            <ellipse cx="40" cy="88" rx="28" ry="8" fill="white"/>
            <path d="M12 30 Q12 88 40 88 Q68 88 68 30 Q68 8 40 8 Q12 8 12 30Z" fill="white"/>
            <ellipse cx="40" cy="30" rx="28" ry="12" fill="#FF9A00"/>
            <ellipse cx="40" cy="30" rx="18" ry="8" fill="#282521"/>
            <path d="M33 20 Q36 12 40 16 Q44 12 47 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. FULL-BLEED PHOTO — dark moody tandoor + orange stripe + floating card
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[480px] overflow-hidden" id="story" data-scroll>
        <Image
          src="/l-intro-1607603831.jpg"
          alt="Chicken pieces over live fire — MK's clay tandoor, Noida Sector 75"
          fill
          className="object-cover brightness-[0.35]"
        />

        {/* Left vertical orange stripe + text */}
        <div className="absolute left-0 top-0 bottom-0 flex">
          <div className="w-2 bg-mk-orange flex-shrink-0" />
          <div className="flex flex-col justify-end pl-7 pb-12 pr-4">
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-3">
              NOIDA · SECTOR 75
            </p>
            <h2
              className="font-poster text-white uppercase leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              REAL<br />TANDOOR
            </h2>
            <p className="font-hindi text-white/30 text-base mt-2 text-right">
              असली तंदूर
            </p>
          </div>
        </div>

        {/* Floating black card — right side */}
        <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 bg-mk-black border border-white/10 p-8 max-w-[260px] md:max-w-xs">
          <p className="font-poster text-mk-orange text-4xl md:text-5xl uppercase leading-tight">
            ROASTED<br />NOT<br />FRIED.
          </p>
          <div className="w-8 h-0.5 bg-mk-orange my-5" />
          <p className="font-hindi text-white/40 text-sm">
            भुना हुआ, तला नहीं
          </p>
          <p className="font-body text-white/30 text-xs uppercase tracking-widest mt-4">
            Spectrum Mall, Sector 50<br />Noida · +91 77973 39211
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. MENU GRID — 3-col alternating cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-black" id="menu">
        {/* Section label */}
        <div className="border-b border-white/10 px-8 py-5 flex items-baseline justify-between">
          <h2
            className="font-poster text-white uppercase"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            OUR MENU
          </h2>
          <p className="font-hindi text-white/30 text-xl">हमारा मेनू</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3">
          {menuCards.map((card, i) => {
            if (card.type === 'divider') {
              return (
                <div
                  key={i}
                  className="bg-white flex flex-col justify-end p-8 min-h-[320px]"
                  data-scroll
                >
                  <div className="w-8 h-1 bg-mk-orange mb-5" />
                  <h3
                    className="font-poster text-mk-black uppercase leading-tight"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-hindi text-mk-black/40 text-sm mt-2 text-right">
                    {card.titleHindi}
                  </p>
                </div>
              )
            }

            const isFoodCard = card as FoodCard
            const isOrange = isFoodCard.bg === 'orange'

            return (
              <div
                key={i}
                className={`relative flex flex-col min-h-[320px] overflow-hidden border border-black ${
                  isOrange ? 'bg-mk-orange' : 'bg-mk-charcoal'
                }`}
                data-scroll
              >
                {/* Brand stamp */}
                <div className="absolute top-4 right-4 w-9 h-9 border border-white/25 flex items-center justify-center">
                  <span className="font-poster text-white/30 text-[9px] uppercase">MK&apos;S</span>
                </div>

                {/* Dish name + Hindi */}
                <div className="px-6 pt-6 pb-3 flex-shrink-0">
                  <h3 className="font-poster text-white text-2xl md:text-3xl uppercase leading-none">
                    {isFoodCard.name}
                  </h3>
                  <p className="font-hindi text-white/40 text-xs mt-1 text-right">
                    {isFoodCard.nameHindi}
                  </p>
                </div>

                {/* Food photo */}
                <div className="flex-1 relative mx-6 min-h-[140px]">
                  <Image
                    src={isFoodCard.image}
                    alt={isFoodCard.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Price */}
                <div className="px-6 py-4 flex items-end justify-between">
                  <p className="font-body text-white/50 text-[10px] uppercase tracking-widest">Starting</p>
                  <p className="font-poster text-white text-2xl">{isFoodCard.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. TRANSITION BANNER — FIRED FRESH
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-orange overflow-hidden" data-scroll>
        <div className="flex items-center justify-between px-8 py-8 gap-6">
          {/* Flame icon */}
          <svg viewBox="0 0 60 80" fill="none" className="w-10 md:w-16 flex-shrink-0 opacity-40" aria-hidden="true">
            <path d="M30 4 C30 4 50 25 50 45 C50 62 42 74 30 76 C18 74 10 62 10 45 C10 25 30 4 30 4Z" fill="white"/>
            <path d="M30 30 C30 30 40 42 40 52 C40 62 36 68 30 70 C24 68 20 62 20 52 C20 42 30 30 30 30Z" fill="#FF9A00"/>
          </svg>
          <div className="flex-1 text-right">
            <p
              className="font-poster text-white uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
            >
              FIRED FRESH
            </p>
            <p className="font-hindi text-white/60 text-base mt-1">ताज़ा भुना</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. SECOND FEATURE — Biryani split
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="flex flex-col md:flex-row min-h-[420px]" data-scroll>
        <div className="relative w-full md:w-1/2 min-h-[300px]">
          <Image
            src="/biryani.avif"
            alt="Slow-cooked dum chicken biryani — MK's Noida"
            fill className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 bg-mk-charcoal flex flex-col justify-center px-10 py-14 md:px-14">
          <p className="font-body text-white/30 text-[10px] uppercase tracking-widest mb-4">
            SLOW COOKED · धीमी आंच पर
          </p>
          <h2
            className="font-poster text-white uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            CHICKEN<br />BIRYANI
          </h2>
          <p className="font-hindi text-white/25 text-2xl mb-6 text-right">चिकन बिरयानी</p>
          <div className="w-8 h-0.5 bg-mk-orange mb-6" />
          <p className="font-body text-white/50 text-xs uppercase tracking-wider leading-loose mb-8">
            Tandoor-marinated chicken, layered with aged basmati, caramelised onions,
            saffron, and whole spices — sealed and dum cooked. The smoky depth comes
            from the marinade itself.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-poster text-mk-orange text-4xl">₹249</span>
            <Link
              href="/chicken-biryani-noida"
              className="font-poster text-white text-sm uppercase tracking-widest border border-white/30 px-5 py-2 hover:bg-white hover:text-mk-black transition-colors"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. SOCIAL TICKER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-orange py-4 overflow-hidden" aria-label="Follow us">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-poster text-white text-2xl md:text-3xl uppercase mx-8 whitespace-nowrap">
              FOLLOW US &nbsp;·&nbsp; फ़ॉलो करें &nbsp;·&nbsp; @MKSTANDOORI &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. SEO LINKS — three cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-black border-t border-white/10" data-scroll>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            { label: 'TANDOORI CHICKEN IN NOIDA SECTOR 75', labelHindi: 'तंदूरी चिकन', href: '/tandoori-chicken-noida-sector-75', img: '/butterflied_tandoori_chicken_passage_to_india.jpeg' },
            { label: 'CHICKEN BIRYANI IN NOIDA',            labelHindi: 'चिकन बिरयानी', href: '/chicken-biryani-noida',               img: '/biryani.avif' },
            { label: 'FAMILY RESTAURANT SECTOR 75',         labelHindi: 'पारिवारिक भोजन', href: '/family-restaurant-sector-75-noida', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80&fit=crop' },
          ].map((card) => (
            <Link key={card.href} href={card.href} className="group block relative h-64 overflow-hidden border border-mk-black">
              <Image src={card.img} alt={card.label} fill className="object-cover brightness-50 group-hover:brightness-40 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-poster text-white text-xl uppercase leading-tight">{card.label}</h3>
                <p className="font-hindi text-white/40 text-sm mt-1">{card.labelHindi}</p>
                <span className="font-poster text-mk-orange text-xs uppercase tracking-widest mt-3">EXPLORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. LOCATION — full-width strip
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-mk-charcoal border-t-2 border-mk-orange" id="location" data-scroll>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Info */}
          <div className="px-10 py-14 md:px-14 border-b md:border-b-0 md:border-r border-white/10">
            <p className="font-body text-white/30 text-[10px] uppercase tracking-widest mb-4">VISIT US · हमें खोजें</p>
            <h2
              className="font-poster text-white uppercase leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              FIND MK&apos;S
            </h2>
            <div className="space-y-5">
              {[
                { label: 'ADDRESS', value: 'Spectrum Mall, Sector 50\nNoida, Uttar Pradesh 201301', note: 'Near Sector 75 Metro Station' },
                { label: 'PHONE',   value: '+91 77973 39211', href: 'tel:+917797339211' },
                { label: 'HOURS',   value: 'Mon – Sun  ·  11:00 AM – 11:00 PM' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-body text-white/30 text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="font-poster text-white text-2xl hover:text-mk-orange transition-colors">{item.value}</a>
                    : <p className="font-body text-white/70 text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                  }
                  {item.note && <p className="font-body text-white/30 text-xs mt-0.5">{item.note}</p>}
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com?q=Spectrum+Mall+Sector+50+Noida"
              target="_blank" rel="noopener noreferrer"
              className="inline-block mt-10 font-poster text-mk-black bg-mk-orange text-sm uppercase tracking-widest px-8 py-3 hover:bg-white transition-colors"
            >
              GET DIRECTIONS
            </a>
          </div>

          {/* Map */}
          <div className="h-72 md:h-auto min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.6!2d77.3591!3d28.5745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzI4LjIiTiA3N8KwMjEnMzIuOCJF!5e0!3m2!1sen!2sin!4v1234"
              width="100%" height="100%"
              style={{ border: 0, filter: 'invert(85%) hue-rotate(180deg) saturate(0.6)' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MK's — Spectrum Mall, Sector 50, Noida"
            />
          </div>
        </div>
      </section>
    </>
  )
}
