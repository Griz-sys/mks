import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PHONE_SECONDARY, PHONE_SECONDARY_TEL, ADDRESS_LINE_1 } from '../lib/constants'

export const metadata: Metadata = {
  title: "Malai Chaap in Noida | MK's Restaurant Sector 75",
  description:
    "Craving malai chaap in Noida? MK's Creamy Soya Chaap is a rich, mildly-spiced malai marinade on soya chaap sticks, roasted in a clay tandoor — never fried. ₹250. Near Sector 75.",
  keywords: [
    'malai chaap noida',
    'malai chaap sector 75 noida',
    'creamy soya chaap noida',
    'malai soya chaap near me',
    "MK's malai chaap",
    'veg malai chaap noida',
  ],
  alternates: { canonical: 'https://mkstandoori.com/malai-chaap-noida' },
  openGraph: {
    title: "Malai Chaap in Noida — MK's Restaurant Sector 75",
    description: 'Rich, creamy malai marinade on soya chaap, clay-tandoor roasted. ₹250 for 3 strips.',
    type: 'website',
    images: [{ url: 'https://mkstandoori.com/og-malai-chaap.jpg', width: 1200, height: 630, alt: "Malai soya chaap skewers — MK's Noida" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Malai Chaap in Noida — MK's Restaurant Sector 75",
    description: 'Rich, creamy malai marinade on soya chaap, clay-tandoor roasted. ₹250 for 3 strips.',
    images: ['https://mkstandoori.com/og-malai-chaap.jpg'],
  },
}

const faqs = [
  {
    q: 'Where can I get good malai chaap in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) serves malai chaap — our Creamy Soya Chaap — in a rich cream marinade, clay-tandoor roasted.",
  },
  {
    q: 'What is malai chaap?',
    a: "Malai chaap is soya chaap (soybean sticks) marinated in a rich, mildly-spiced cream (malai) blend before being roasted. On MK's menu, this is listed as Creamy Soya Chaap.",
  },
  {
    q: 'Is malai chaap vegetarian?',
    a: 'Yes — soya chaap is made entirely from soybean, making malai chaap a fully vegetarian, high-protein alternative to meat skewers.',
  },
  {
    q: "What is the price of malai chaap at MK's?",
    a: "MK's Malai (Creamy) Soya Chaap is ₹250 for a plate of 3 strips. We also serve Classic and Achari (pickled) soya chaap at the same price.",
  },
  {
    q: 'Is malai chaap fried or roasted at MK\'s?',
    a: "Roasted, always. Like everything on our menu, malai chaap goes into the clay tandoor after marination — nothing is deep fried.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: ['Indian', 'Vegetarian'],
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Malai (Creamy) Soya Chaap',
      description: 'Soya chaap sticks in a rich malai (cream) marinade, roasted in a clay tandoor. 3 strips a plate.',
      offers: { '@type': 'Offer', price: '250', priceCurrency: 'INR' },
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

export default function MalaiChaapPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Malai Chaap Noida', item: 'https://mkstandoori.com/malai-chaap-noida' },
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
          src="/creamy-soya-chaap.png"
          alt="Malai soya chaap skewers with mint chutney — MK's Noida"
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
            <span className="text-mk-orange">Malai Chaap Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Malai Chaap<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Rich, creamy marinade on soya chaap. Clay-tandoor roasted, never fried. ₹250.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Malai Chaap
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Noida&apos;s Creamy, Tandoor-Roasted Malai Chaap
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                Searching for <strong className="text-white">malai chaap in Noida</strong> means you
                want soya chaap in that rich, mellow cream marinade — milder and creamier than a
                classic spice blend. At MK&apos;s, that&apos;s our Creamy Soya Chaap.
              </p>
              <p>
                Made from soybean sticks, our malai chaap is marinated in a thick cream (malai)
                base with a gentle spice profile, then skewered and roasted in a clay tandoor —
                the same way we treat our chicken. No shortcuts, no frying, just real roast.
              </p>
              <p>
                It comes as a plate of 3 strips, plated with mint chutney and a wedge of lime. If
                you want more heat, our Achari (pickled) chaap is available at the same price; for
                the classic house blend, try our Classic Soya Chaap.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Malai Chaap &amp; More</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="bg-mk-black border border-mk-orange/40 overflow-hidden mb-5">
              <div className="bg-mk-orange text-mk-black font-body font-bold text-xs uppercase tracking-widest px-4 py-1.5">
                Bestseller
              </div>
              <div className="p-6">
                <h3 className="font-body text-2xl text-white mb-1">Malai (Creamy) Soya Chaap</h3>
                <span className="font-display text-mk-orange text-2xl block mb-3">₹250</span>
                <p className="font-body text-white/50 text-sm leading-relaxed">Rich malai marinade, milder spice, tandoor roasted. 3 strips a plate.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Classic Soya Chaap', price: '₹250', desc: 'Classic house spice marinade, tandoor roasted.' },
                { name: 'Pickled (Achari) Soya Chaap', price: '₹250', desc: 'Tangy achari marinade, tandoor roasted.' },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-body text-xl text-white mb-1">{item.name}</h3>
                    <span className="font-display text-mk-orange text-xl block mb-3">{item.price}</span>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center font-body text-white/30 text-xs mt-6 uppercase tracking-widest">
              Served with mint chutney and lime wedge
            </p>
          </div>
        </section>

        {/* What goes in */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/creamy-soya-chaap.png"
                alt="MK's malai chaap close-up, tandoor roasted"
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
                  'Soya chaap (soybean) sticks',
                  'Rich cream (malai) marinade base',
                  'Ginger-garlic paste',
                  'Mild house spice blend',
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
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Malai Chaap in Noida</h2>
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
          <h2 className="font-display text-4xl text-white mb-4">Order Your Malai Chaap</h2>
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
              <Link href="/soya-chaap-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Soya Chaap Noida
              </Link>
              <Link href="/chicken-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Roll Noida
              </Link>
              <Link href="/kati-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Kati Roll Noida
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
