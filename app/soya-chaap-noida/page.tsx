import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Soya Chaap in Noida | MK's Restaurant Sector 75",
  description:
    "Craving tandoori soya chaap in Noida? MK's serves clay-tandoor roasted soya chaap — Classic, Creamy or Achari, 3 strips a plate. Starting ₹250. Near Sector 75.",
  keywords: [
    'soya chaap noida',
    'best soya chaap noida',
    'tandoori soya chaap noida',
    'soya chaap sector 75 noida',
    'veg chaap near me noida',
    "MK's soya chaap",
  ],
  alternates: { canonical: 'https://mkstandoori.com/soya-chaap-noida' },
  openGraph: {
    title: "Soya Chaap in Noida — MK's Restaurant Sector 75",
    description: 'Clay-tandoor roasted soya chaap. Classic, Creamy, Achari. ₹250 for 3 strips.',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Where can I get the best soya chaap in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) serves clay-tandoor roasted soya chaap in Classic, Creamy, and Achari flavours.",
  },
  {
    q: 'Is soya chaap vegetarian?',
    a: "Yes — soya chaap is made from soybean (soy) sticks, making it a fully vegetarian, high-protein alternative to meat skewers. It's a great pick if you want the tandoori experience without the meat.",
  },
  {
    q: "What flavours of soya chaap does MK's serve?",
    a: 'Three: Classic (our house spice marinade), Creamy (rich, mellow cream marinade), and Achari (tangy pickled-spice marinade). All are tandoor roasted, never fried.',
  },
  {
    q: "What is the price of soya chaap at MK's?",
    a: 'Soya Chaap is ₹250 for a plate of 3 strips, across all three flavours — Classic, Creamy, and Achari.',
  },
  {
    q: 'Is the soya chaap fried or roasted?',
    a: "Roasted — always. Like everything else at MK's, our soya chaap goes into the clay tandoor after marination. Nothing on our menu is deep fried.",
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
      name: 'Classic Soya Chaap',
      description: 'Soya chaap sticks in a classic spice marinade, roasted in a clay tandoor. 3 strips a plate.',
      offers: { '@type': 'Offer', price: '250', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Creamy Soya Chaap',
      description: 'Soya chaap sticks in a rich cream marinade, tandoor roasted. 3 strips a plate.',
      offers: { '@type': 'Offer', price: '250', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Pickled (Achari) Soya Chaap',
      description: 'Soya chaap sticks in a tangy achari marinade, tandoor roasted. 3 strips a plate.',
      offers: { '@type': 'Offer', price: '250', priceCurrency: 'INR' },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  telephone: '+91-8076374624',
}

export default function SoyaChaapPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Soya Chaap Noida', item: 'https://mkstandoori.com/soya-chaap-noida' },
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
          src="/Gemini_Generated_Image_cvrmn8cvrmn8cvrm.png"
          alt="Tandoor-roasted soya chaap skewers with naan and mint chutney — MK's Noida"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Soya Chaap Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Soya Chaap<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Clay-tandoor roasted, never fried. Classic, Creamy, or Achari. ₹250 a plate.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Chaap
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Noida&apos;s Tandoor-Roasted Soya Chaap
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                Searching for <strong className="text-white">soya chaap in Noida</strong> usually
                means one thing — you want the smoky, char-grilled tandoori experience, minus the
                meat. That&apos;s exactly the gap MK&apos;s soya chaap fills.
              </p>
              <p>
                Made from soybean sticks, our chaap is marinated the same way we treat our chicken —
                yoghurt, ginger-garlic, and a house spice blend — before going straight into the
                clay tandoor. No shortcuts, no frying, just real roast.
              </p>
              <p>
                We serve it in three ways: Classic, for the purist; Creamy, for a richer, milder
                bite; and Achari, with a tangy pickled-spice kick. All three come as a plate of
                3 strips, plated with mint chutney and lime.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Soya Chaap Menu</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Classic Soya Chaap',
                  price: '₹250',
                  desc: 'Classic house spice marinade, tandoor roasted. 3 strips a plate.',
                  tag: 'Bestseller',
                },
                {
                  name: 'Creamy Soya Chaap',
                  price: '₹250',
                  desc: 'Rich cream marinade, milder spice, tandoor roasted. 3 strips a plate.',
                  tag: 'Veg',
                },
                {
                  name: 'Pickled Soya Chaap',
                  price: '₹250',
                  desc: 'Tangy achari marinade, tandoor roasted. 3 strips a plate.',
                  tag: 'Veg',
                },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors overflow-hidden">
                  <div className="bg-mk-orange text-mk-black font-body font-bold text-xs uppercase tracking-widest px-4 py-1.5">
                    {item.tag}
                  </div>
                  <div className="p-6">
                    <h3 className="font-body text-2xl text-white mb-1">{item.name}</h3>
                    <span className="font-display text-mk-orange text-2xl block mb-3">{item.price}</span>
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
                src="/Gemini_Generated_Image_cvrmn8cvrmn8cvrm.png"
                alt="MK's soya chaap skewers close-up, tandoor roasted"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Ingredients</span>
              <h2 className="font-display text-3xl text-white mt-3 mb-6">What Goes In</h2>
              <ul className="space-y-3">
                {[
                  'Soya chaap (soybean) sticks',
                  'Thick yoghurt marinade base',
                  'Ginger-garlic paste',
                  'House dry spice blend',
                  'Achari (pickling spice) mix — for the Achari variant',
                  'Fresh cream — for the Creamy variant',
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
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Soya Chaap in Noida</h2>
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
          <h2 className="font-display text-4xl text-white mb-4">Order Your Soya Chaap</h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Visit us at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida — or call to order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+918076374624" className="bg-mk-orange text-mk-black font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Call +91 80763 74624
            </a>
            <Link href="/#location" className="border border-white/20 text-white font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:border-mk-orange hover:text-mk-orange transition-colors">
              Get Directions
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-body text-white/30 text-xs mb-4 uppercase tracking-widest">Also try</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/chicken-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Roll Noida
              </Link>
              <Link href="/kati-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Kati Roll Noida
              </Link>
              <Link href="/tandoori-chicken-noida-sector-75" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Tandoori Chicken Sector 75
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
