import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "MK's — Best Tandoori Chicken in Noida Sector 75 | It's Roasted, Not Fried",
  alternates: { canonical: 'https://www.mkstandoori.in' },
}

// ─── Menu helpers ─────────────────────────────────────────────────────────────
const ORANGE = 'bg-mk-orange'
const GREY   = 'bg-mk-charcoal'
const CREAM  = 'bg-mk-cream'

function MenuCard({ bg, nameHindi, name, image, alt, desc, price }: {
  bg: string; nameHindi: string; name: string
  image: string; alt: string; desc: string; price: string
}) {
  return (
    <div className={`${bg} flex flex-col border-r border-white/5 last:border-r-0`}>
      <div className="px-5 pt-5 pb-2">
        <p className="font-hindi text-white/40 text-xs mb-1">{nameHindi}</p>
        <h4 className="font-poster text-white uppercase leading-none" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2rem)' }}>
          {name}
        </h4>
      </div>
      <div className="flex-1 relative min-h-[130px] mx-5 mt-2">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div className="px-5 pt-3 pb-5">
        <p className="font-body text-white/35 text-[9px] uppercase tracking-widest mb-1.5">{desc}</p>
        <p className="font-poster text-white text-xl">{price}</p>
      </div>
    </div>
  )
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "MK's",
  description: "Authentic tandoori chicken in Noida Sector 75 — roasted in a clay tandoor, not fried.",
  url: 'https://www.mkstandoori.in',
  telephone: '+91-8076374624',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2',
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
        {/* Two editorial photos + circular logo stamp */}
        <div className="grid grid-cols-2 h-[55vh] min-h-[320px] relative">
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

          {/* ── Circular logo stamp — centered over both photos ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative" style={{ width: 'clamp(200px, 22vw, 300px)', height: 'clamp(200px, 22vw, 300px)' }}>

              {/* 1 — Solid black background circle */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="50" cy="50" r="44" fill="#000"/>
              </svg>

              {/* Logo centered, static */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: '78%', height: '78%' }}>
                  <Image src="/MKs-Logo.svg" alt="MK's" fill className="object-contain"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Massive full-width headline */}
        <div className="bg-mk-black overflow-hidden">
          <h1
            className="font-poster text-white leading-none uppercase text-center w-full py-3 px-2"
            style={{ fontSize: 'clamp(5rem, 12.5vw, 13rem)', letterSpacing: '-0.01em', WebkitTextStroke: '2px white' }}
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
            <ellipse cx="40" cy="30" rx="28" ry="12" fill="#CD3910"/>
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
            Spectrum Metro Mall, Phase-2<br />Sector 75, Noida · +91 80763 74624
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. MENU GRID
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="menu" className="bg-mk-black">

        <div className="border-b border-white/10 px-8 py-5">
          <h2 className="font-poster text-white uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
            OUR MENU
          </h2>
        </div>

        {/* ── CHICKEN GROUP: Tandoori + Tikka flow together, no break ─────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">

          {/* Tandoori label — wide (spans 2 cols) */}
          <div className={`${CREAM} md:col-span-2 flex flex-col justify-between p-7 border-r border-black/10`}>
            <div>
              <p className="font-hindi text-mk-black/35 text-sm mb-2">तंदूरी चिकन</p>
              <h3 className="font-poster text-mk-black uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.5rem)' }}>
                TANDOORI<br/>CHICKEN
              </h3>
            </div>
            <p className="font-body text-mk-black/35 text-[10px] uppercase tracking-widest mt-6">
              MARINATED OVERNIGHT · CLAY TANDOOR · 450°C
            </p>
          </div>

          {/* Classic Chicken */}
          <MenuCard bg={ORANGE} nameHindi="क्लासिक चिकन" name="CLASSIC CHICKEN"
            image="/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp"
            alt="Classic tandoori chicken" desc="OVERNIGHT MARINADE · CLAY TANDOOR" price="FROM ₹180" />

          {/* Creamy Chicken */}
          <MenuCard bg={ORANGE} nameHindi="क्रीमी चिकन" name="CREAMY CHICKEN"
            image="/images.jpg"
            alt="Creamy tandoori chicken" desc="RICH CREAM MARINADE · CLAY TANDOOR" price="FROM ₹190" />

          {/* Tikka sub-label — 1 col, continues on same grid row */}
          <div className={`${CREAM} flex flex-col justify-between p-7 border-r border-black/10 border-t border-t-black/10`}>
            <div>
              <p className="font-hindi text-mk-black/35 text-sm mb-2">चिकन टिक्का</p>
              <h3 className="font-poster text-mk-black uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.5rem)' }}>
                CHICKEN<br/>TIKKA
              </h3>
            </div>
            <p className="font-body text-mk-black/35 text-[10px] uppercase tracking-widest mt-6">
              BONELESS · SKEWERED · CLAY TANDOOR
            </p>
          </div>

          {/* Classic Tikka */}
          <MenuCard bg={GREY} nameHindi="क्लासिक टिक्का" name="CLASSIC TIKKA"
            image="/butterflied_tandoori_chicken_passage_to_india.jpeg"
            alt="Classic chicken tikka" desc="BONELESS · CLASSIC SPICE BLEND" price="FROM ₹350" />

          {/* Creamy Tikka */}
          <MenuCard bg={GREY} nameHindi="क्रीमी टिक्का" name="CREAMY TIKKA"
            image="/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp"
            alt="Creamy chicken tikka" desc="BONELESS · CREAM & CASHEW MARINADE" price="FROM ₹370" />

          {/* Hot & Spicy Tikka */}
          <MenuCard bg={GREY} nameHindi="हॉट & स्पाइसी टिक्का" name="HOT & SPICY TIKKA"
            image="/butterflied_tandoori_chicken_passage_to_india.jpeg"
            alt="Hot and spicy chicken tikka" desc="BONELESS · EXTRA CHILLI MARINADE" price="FROM ₹380" />

        </div>

        {/* ── SOYA CHAAP ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">

          <div className={`${CREAM} flex flex-col justify-between p-7 border-r border-black/10`}>
            <div>
              <p className="font-hindi text-mk-black/35 text-sm mb-2">सोया चाप</p>
              <h3 className="font-poster text-mk-black uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.5rem)' }}>
                SOYA<br/>CHAAP
              </h3>
            </div>
            <p className="font-body text-mk-black/35 text-[10px] uppercase tracking-widest mt-6">
              SLOW MARINATED · CLAY TANDOOR ROASTED
            </p>
          </div>

          <MenuCard bg={ORANGE} nameHindi="क्लासिक चाप" name="CLASSIC CHAAP"
            image="/l-intro-1607603831.jpg"
            alt="Classic soya chaap" desc="CLASSIC SPICE MARINADE · TANDOOR" price="₹250" />
          <MenuCard bg={ORANGE} nameHindi="क्रीमी चाप" name="CREAMY CHAAP"
            image="/l-intro-1607603831.jpg"
            alt="Creamy soya chaap" desc="CREAM MARINADE · TANDOOR" price="₹270" />
          <MenuCard bg={ORANGE} nameHindi="अचारी चाप" name="PICKLED CHAAP"
            image="/l-intro-1607603831.jpg"
            alt="Pickled soya chaap" desc="ACHARI MARINADE · TANDOOR" price="₹270" />

        </div>

        {/* ── ROLLS & ROTI ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">

          <div className={`${CREAM} flex flex-col justify-between p-7 border-r border-black/10`}>
            <div>
              <p className="font-hindi text-mk-black/35 text-sm mb-2">रोल्स और रोटी</p>
              <h3 className="font-poster text-mk-black uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.5rem)' }}>
                ROLLS<br/>& ROTI
              </h3>
            </div>
            <p className="font-body text-mk-black/35 text-[10px] uppercase tracking-widest mt-6">
              FRESH RUMALI · GRILLED · HAND-ROLLED
            </p>
          </div>

          <MenuCard bg={GREY} nameHindi="चिकन रोल" name="CHICKEN ROLL"
            image="/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp"
            alt="Chicken roll" desc="TANDOORI CHICKEN · RUMALI · CHUTNEY" price="₹180" />
          <MenuCard bg={GREY} nameHindi="सोया रोल" name="SOYA ROLL"
            image="/l-intro-1607603831.jpg"
            alt="Soya roll" desc="SOYA CHAAP · RUMALI · CHUTNEY" price="₹150" />
          <MenuCard bg={GREY} nameHindi="रुमाली रोटी" name="RUMALI ROTI"
            image="/images.jpg"
            alt="Rumali roti" desc="THIN HAND-STRETCHED · TAWA ROASTED" price="₹40" />

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
            <path d="M30 30 C30 30 40 42 40 52 C40 62 36 68 30 70 C24 68 20 62 20 52 C20 42 30 30 30 30Z" fill="#CD3910"/>
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
          9. SEO LINKS — three cards
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
          10. LOCATION — full-width strip
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
                { label: 'ADDRESS', value: 'Shop No. 33, E Block, Spectrum Metro Mall\nPhase-2, Sector 75, Noida 201301', note: 'Spectrum Metro Mall, Phase-2' },
                { label: 'PHONE',   value: '+91 80763 74624', href: 'tel:+918076374624' },
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
              href="https://maps.google.com?q=Spectrum+Metro+Mall+Phase+2+Sector+75+Noida"
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
