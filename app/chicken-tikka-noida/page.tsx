import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PHONE_SECONDARY, PHONE_SECONDARY_TEL, ADDRESS_LINE_1 } from '../lib/constants'

export const metadata: Metadata = {
  title: { absolute: "Chicken Tikka in Noida | MK's Restaurant Sector 75" },
  description:
    "Craving chicken tikka in Noida? MK's serves boneless chicken tikka — Classic, Creamy or Hot & Spicy — marinated overnight and roasted in a clay tandoor. From ₹350. Near Sector 75.",
  keywords: [
    'chicken tikka noida',
    'best chicken tikka noida',
    'chicken tikka sector 75 noida',
    'boneless chicken tikka noida',
    'tandoori chicken tikka near me',
    "MK's chicken tikka",
  ],
  alternates: { canonical: 'https://mkstandoori.com/chicken-tikka-noida' },
  openGraph: {
    title: "Chicken Tikka in Noida — MK's Restaurant Sector 75",
    description: 'Boneless chicken tikka, clay-tandoor roasted. Classic, Creamy, Hot & Spicy. From ₹350.',
    type: 'website',
    images: [{ url: 'https://mkstandoori.com/og-chicken-tikka.jpg', width: 1200, height: 630, alt: "Grilled boneless chicken tikka — MK's Noida" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chicken Tikka in Noida — MK's Restaurant Sector 75",
    description: 'Boneless chicken tikka, clay-tandoor roasted. Classic, Creamy, Hot & Spicy. From ₹350.',
    images: ['https://mkstandoori.com/og-chicken-tikka.jpg'],
  },
}

const faqs = [
  {
    q: 'Where can I get the best chicken tikka in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) serves boneless chicken tikka marinated overnight and roasted in a clay tandoor — no frying.",
  },
  {
    q: "What chicken tikka flavours does MK's serve?",
    a: 'Three: Classic (our house spice blend), Creamy (cream and cashew marinade), and Hot & Spicy (extra chilli). All boneless, all clay-tandoor roasted.',
  },
  {
    q: "What is the price of chicken tikka at MK's?",
    a: 'Classic and Creamy Chicken Tikka are ₹350 for 4 pc or ₹650 for 8 pc. Hot & Spicy Chicken Tikka is ₹380 for 4 pc or ₹680 for 8 pc.',
  },
  {
    q: 'What is the difference between chicken tikka and tandoori chicken?',
    a: "Chicken tikka is boneless — cut into cubes before marinating and skewering — while tandoori chicken is cooked bone-in. Both go through the same overnight marinade and 450°C clay tandoor at MK's.",
  },
  {
    q: "Is MK's chicken tikka available for delivery in Noida?",
    a: "Yes — call +91 80763 74624 for delivery, or order through Swiggy or Zomato.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: 'Indian',
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Classic Chicken Tikka',
      description: 'Boneless chicken tikka, classic spice blend, roasted in clay tandoor.',
      offers: [
        { '@type': 'Offer', price: '350', priceCurrency: 'INR', name: '4 Pc' },
        { '@type': 'Offer', price: '650', priceCurrency: 'INR', name: '8 Pc' },
      ],
    },
    {
      '@type': 'MenuItem',
      name: 'Creamy Chicken Tikka',
      description: 'Boneless chicken tikka, cream and cashew marinade, roasted in clay tandoor.',
      offers: [
        { '@type': 'Offer', price: '350', priceCurrency: 'INR', name: '4 Pc' },
        { '@type': 'Offer', price: '650', priceCurrency: 'INR', name: '8 Pc' },
      ],
    },
    {
      '@type': 'MenuItem',
      name: 'Hot & Spicy Chicken Tikka',
      description: 'Boneless chicken tikka, extra chilli marinade, roasted in clay tandoor.',
      offers: [
        { '@type': 'Offer', price: '380', priceCurrency: 'INR', name: '4 Pc' },
        { '@type': 'Offer', price: '680', priceCurrency: 'INR', name: '8 Pc' },
      ],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS_LINE_1,
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5745,
    longitude: 77.3591,
  },
  telephone: PHONE_SECONDARY_TEL.replace('tel:', ''),
}

export default function ChickenTikkaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mkstandoori.com' },
      { '@type': 'ListItem', position: 2, name: 'Chicken Tikka Noida', item: 'https://mkstandoori.com/chicken-tikka-noida' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-mk-charcoal pt-20">
        <Image
          src="/classic-chicken-tikka.jpg"
          alt="Grilled boneless chicken tikka skewers — MK's Noida"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Chicken Tikka Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Chicken Tikka<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Boneless, clay-tandoor roasted. Classic, Creamy, or Hot &amp; Spicy. From ₹350.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Tikka
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Noida&apos;s Boneless Chicken Tikka
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                Searching for <strong className="text-white">chicken tikka in Noida</strong> usually
                means one thing — boneless, char-grilled cubes with real tandoor smoke, not a
                pan-fried imitation. That&apos;s exactly what MK&apos;s serves.
              </p>
              <p>
                Every batch starts as boneless chicken, cut into cubes and marinated overnight in
                the same house blend we use for our tandoori chicken — yoghurt, ginger-garlic, and
                spice — before going onto skewers and into the clay tandoor at 450°C.
              </p>
              <p>
                We serve it three ways: Classic, for the purist; Creamy, with a rich cream and
                cashew marinade; and Hot &amp; Spicy, for those who want extra chilli heat. All
                boneless, all roasted, never fried.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Chicken Tikka Menu</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Classic Chicken Tikka 4 Pc', price: '₹350', desc: 'Boneless, classic spice blend, clay tandoor roasted.' },
                { name: 'Classic Chicken Tikka 8 Pc', price: '₹650', desc: 'Eight pieces — great for sharing.' },
                { name: 'Creamy Chicken Tikka 4 Pc', price: '₹350', desc: 'Boneless, cream and cashew marinade.' },
                { name: 'Creamy Chicken Tikka 8 Pc', price: '₹650', desc: 'Eight pieces of our popular creamy variant.' },
                { name: 'Hot & Spicy Chicken Tikka 4 Pc', price: '₹380', desc: 'Boneless, extra chilli marinade. For spice lovers.' },
                { name: 'Hot & Spicy Chicken Tikka 8 Pc', price: '₹680', desc: 'Eight pieces of our hottest tikka.' },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-body font-semibold text-white">{item.name}</h3>
                    <span className="font-display text-mk-orange text-xl ml-4 flex-shrink-0">{item.price}</span>
                  </div>
                  <p className="font-body text-white/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What goes in */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/creamy-chicken-tikka.jpg"
                alt="MK's creamy chicken tikka close-up, tandoor roasted"
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Ingredients</span>
              <h2 className="font-display text-3xl text-white mt-3 mb-6">What Goes In</h2>
              <ul className="space-y-3">
                {[
                  'Boneless chicken, cubed',
                  'Thick yoghurt marinade base',
                  'Ginger-garlic paste',
                  'House dry spice blend',
                  'Cream and cashew paste — for the Creamy variant',
                  'Extra chilli — for the Hot & Spicy variant',
                  'Skewered and roasted in a clay tandoor',
                  'Finished with mint chutney and lime',
                ].map((ingredient) => (
                  <li key={ingredient} className="flex items-center gap-3 font-body text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-mk-orange rounded-full flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Chicken Tikka in Noida</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-mk-black border border-white/10 hover:border-mk-orange/30 transition-colors">
                  <summary className="font-body font-semibold text-white p-5 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-mk-orange ml-4 flex-shrink-0 transition-transform">+</span>
                  </summary>
                  <p className="font-body text-white/60 text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-mk-black text-center">
          <h2 className="font-display text-4xl text-white mb-4">Order Your Chicken Tikka</h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Visit us at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida — or call to order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_SECONDARY_TEL} className="bg-mk-orange text-mk-black font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Call {PHONE_SECONDARY}
            </a>
            <Link href="/#location" className="border border-white/20 text-white font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:border-mk-orange hover:text-mk-orange transition-colors">
              Get Directions
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-body text-white/30 text-xs mb-4 uppercase tracking-widest">Also try</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/tandoori-chicken-noida-sector-75" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Tandoori Chicken Sector 75
              </Link>
              <Link href="/chicken-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Roll Noida
              </Link>
              <Link href="/north-indian-restaurant-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                North Indian Restaurant Noida
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
