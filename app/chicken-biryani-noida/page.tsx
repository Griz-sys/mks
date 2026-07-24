import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Chicken Biryani in Noida | MK's Restaurant Sector 75",
  description:
    "Craving chicken biryani in Noida? MK's serves slow-cooked dum biryani with fragrant basmati rice, whole spices, and tandoor-roasted chicken. Starting ₹249. Near Sector 75.",
  keywords: [
    'chicken biryani noida',
    'best chicken biryani noida',
    'chicken biryani sector 75 noida',
    'dum biryani noida',
    "MK's biryani noida",
    'biryani near sector 75',
  ],
  alternates: { canonical: 'https://mkstandoori.com/chicken-biryani-noida' },
  openGraph: {
    title: "Chicken Biryani in Noida — MK's Restaurant Sector 75",
    description: 'Slow-cooked dum biryani. Basmati rice, whole spices, roasted chicken. ₹249.',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Where can I get the best chicken biryani in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) serves slow-cooked dum biryani with whole spices and tender chicken pieces.",
  },
  {
    q: "What type of biryani does MK's serve?",
    a: "We serve dum-style biryani — sealed and slow-cooked in a heavy-bottomed pot with basmati rice, whole spices, and our tandoor-marinated chicken.",
  },
  {
    q: "What is the price of chicken biryani at MK's?",
    a: 'Chicken Biryani (single serving) is ₹249. Mutton Biryani is ₹329. Veg Biryani is ₹179.',
  },
  {
    q: "Is the biryani at MK's available for delivery in Noida?",
    a: "Yes — call +91 80763 74624 for home delivery or check our presence on food delivery apps.",
  },
  {
    q: "What makes MK's chicken biryani different?",
    a: "The chicken is first marinated in our tandoori blend before being layered with rice. This gives the biryani that extra smoky depth you won't find in regular biryani restaurants.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: ['Indian', 'Biryani'],
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Chicken Biryani',
      description: 'Slow-cooked dum biryani with tandoor-marinated chicken and basmati rice.',
      offers: { '@type': 'Offer', price: '249', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Mutton Biryani',
      description: 'Slow-cooked mutton dum biryani with fragrant basmati rice.',
      offers: { '@type': 'Offer', price: '329', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Veg Biryani',
      description: 'Dum biryani with fresh seasonal vegetables and aromatic whole spices.',
      offers: { '@type': 'Offer', price: '179', priceCurrency: 'INR' },
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

export default function ChickenBiryaniPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Chicken Biryani Noida', item: 'https://mkstandoori.com/chicken-biryani-noida' },
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
          src="/Classic%20Chicken%20Tikka%20Skewers.jpg"
          alt="Chicken biryani with saffron rice — MK's Noida"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Chicken Biryani Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Chicken Biryani<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Slow-cooked dum biryani. Fragrant basmati, whole spices, tandoor-marinated chicken.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Biryani
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Noida&apos;s Slow-Cooked Dum Biryani
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                When you search for <strong className="text-white">chicken biryani in Noida</strong>, you&apos;re
                looking for something specific — not a hurried assembly of leftover rice and boiled
                chicken, but a proper dum biryani that respects the process. That&apos;s exactly what
                we serve at MK&apos;s.
              </p>
              <p>
                Our biryani starts with the chicken — it&apos;s first treated the MK&apos;s way:
                marinated in our tandoori blend with yoghurt, ginger-garlic, and aromatic spices.
                This gives our biryani an extra layer of smoky, roasted depth that most biryani
                restaurants simply don&apos;t have access to.
              </p>
              <p>
                The marinated chicken is then layered with long-grain basmati rice, caramelised
                onions, fresh mint, and whole spices — green cardamom, black cardamom, star anise,
                bay leaf, cloves — sealed and slow-cooked (dum) until the rice absorbs every bit
                of flavour from below. Served with raita and a wedge of lime.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Biryani Menu</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Chicken Biryani',
                  price: '₹249',
                  desc: 'Tandoor-marinated chicken, basmati rice, caramelised onions, whole spices. Dum cooked. Serves 1.',
                  tag: 'Bestseller',
                },
                {
                  name: 'Mutton Biryani',
                  price: '₹329',
                  desc: 'Slow-cooked mutton on the bone, layered with fragrant basmati and saffron. Rich, deep flavour.',
                  tag: 'Premium',
                },
                {
                  name: 'Veg Biryani',
                  price: '₹179',
                  veg: true,
                  desc: 'Seasonal vegetables, whole spices, and aromatic basmati rice dum cooked to perfection.',
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
              Served with raita, lime wedge, and papad
            </p>
          </div>
        </section>

        {/* What goes in */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/Classic%20Chicken%20Tikka%20Skewers.jpg"
                alt="MK's chicken biryani close-up with whole spices"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Ingredients</span>
              <h2 className="font-display text-3xl text-white mt-3 mb-6">What Goes In</h2>
              <ul className="space-y-3">
                {[
                  'Long-grain basmati rice (aged)',
                  'Tandoor-marinated whole chicken pieces',
                  'Caramelised golden onions (birista)',
                  'Fresh mint and coriander',
                  'Saffron in warm milk',
                  'Green cardamom, black cardamom, star anise',
                  'Bay leaf, cloves, cinnamon stick',
                  'Ghee-finished top layer',
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
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Biryani in Noida</h2>
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
          <h2 className="font-display text-4xl text-white mb-4">Order Your Biryani</h2>
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
              <Link href="/tandoori-chicken-noida-sector-75" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Tandoori Chicken Sector 75
              </Link>
              <Link href="/family-restaurant-sector-75-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Family Restaurant Sector 75
              </Link>
              <Link href="/soya-chaap-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Soya Chaap Noida
              </Link>
              <Link href="/chicken-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Roll Noida
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
