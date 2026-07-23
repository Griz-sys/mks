import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Chicken Roll in Noida | MK's Restaurant Sector 75",
  description:
    "Looking for a chicken roll in Noida? MK's rolls tandoori chicken in a fresh rumali roti with house chutney — ₹180. Quick, roasted not fried. Near Sector 75.",
  keywords: [
    'chicken roll noida',
    'best chicken roll noida',
    'chicken roll sector 75 noida',
    'tandoori chicken roll noida',
    'rumali chicken roll near me',
    "MK's chicken roll",
  ],
  alternates: { canonical: 'https://mkstandoori.com/chicken-roll-noida' },
  openGraph: {
    title: "Chicken Roll in Noida — MK's Restaurant Sector 75",
    description: 'Tandoori chicken rolled in fresh rumali roti with house chutney. ₹180.',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Where can I get the best chicken roll in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) rolls tandoori-roasted chicken into a fresh hand-stretched rumali roti with house chutney.",
  },
  {
    q: "What's inside MK's chicken roll?",
    a: 'Clay-tandoor roasted chicken, sliced and rolled in a thin rumali roti with mint chutney, onions, and a squeeze of lime — nothing fried, nothing pre-made.',
  },
  {
    q: "What is the price of a chicken roll at MK's?",
    a: 'The Classic Chicken Roll is ₹180. We also do a Classic Soya Roll (veg) for ₹150, and Rumali Roti alone for ₹25.',
  },
  {
    q: "Is MK's chicken roll available for delivery in Noida?",
    a: "Yes — call +91 80763 74624 for delivery, or find us on Swiggy and Zomato.",
  },
  {
    q: "What makes MK's chicken roll different?",
    a: "The chicken going into the roll is the same overnight-marinated, clay-tandoor roasted chicken we're known for — not boiled or reheated filler. That's the difference between a roll and an MK's roll.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: ['Indian', 'Street Food'],
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Classic Chicken Roll',
      description: 'Tandoori chicken, rolled in fresh rumali roti with mint chutney and onions.',
      offers: { '@type': 'Offer', price: '180', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Classic Soya Roll',
      description: 'Tandoori soya chaap, rolled in fresh rumali roti with mint chutney and onions.',
      offers: { '@type': 'Offer', price: '150', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Rumali Roti',
      description: 'Thin hand-stretched roti, roasted fresh on the tawa.',
      offers: { '@type': 'Offer', price: '25', priceCurrency: 'INR' },
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

export default function ChickenRollPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Chicken Roll Noida', item: 'https://mkstandoori.com/chicken-roll-noida' },
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
          src="/chciken_roll.png"
          alt="Tandoori chicken roll in rumali roti with chutney — MK's Noida"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Chicken Roll Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Chicken Roll<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Tandoori chicken, fresh rumali roti, house chutney. ₹180. Ready in minutes.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Roll
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Noida&apos;s Go-To Chicken Roll
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                When you&apos;re searching for a <strong className="text-white">chicken roll in
                Noida</strong>, you want something you can eat on the move that still tastes like
                it was made properly. That&apos;s the whole idea behind MK&apos;s roll.
              </p>
              <p>
                We don&apos;t start with boiled or pre-cooked filler chicken. The chicken in our
                roll is the same chicken that goes into our tandoor — marinated overnight,
                roasted at high heat, then sliced fresh to order.
              </p>
              <p>
                It&apos;s rolled into a thin, hand-stretched rumali roti straight off the tawa,
                layered with mint chutney, sliced onions, and a squeeze of lime. Simple, fast,
                and made to order — not assembled ahead of time.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Rolls &amp; Bread Menu</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Classic Chicken Roll',
                  price: '₹180',
                  desc: 'Tandoori chicken, rumali roti, mint chutney, onions. Made to order.',
                  tag: 'Bestseller',
                },
                {
                  name: 'Classic Soya Roll',
                  price: '₹150',
                  veg: true,
                  desc: 'Tandoori soya chaap, rumali roti, mint chutney, onions.',
                  tag: 'Veg',
                },
                {
                  name: 'Rumali Roti',
                  price: '₹25',
                  desc: 'Thin, hand-stretched, roasted fresh on the tawa.',
                  tag: 'Side',
                },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors overflow-hidden">
                  <div className="bg-mk-orange text-mk-black font-body font-bold text-xs uppercase tracking-widest px-4 py-1.5">
                    {item.tag}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-white mb-1">{item.name}</h3>
                    <span className="font-display text-mk-orange text-2xl block mb-3">{item.price}</span>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center font-body text-white/30 text-xs mt-6 uppercase tracking-widest">
              Rolled fresh to order, never assembled ahead of time
            </p>
          </div>
        </section>

        {/* What goes in */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/chciken_roll.png"
                alt="MK's chicken roll close-up, rumali roti and chutney"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Ingredients</span>
              <h2 className="font-display text-3xl text-white mt-3 mb-6">What Goes In</h2>
              <ul className="space-y-3">
                {[
                  'Clay-tandoor roasted chicken, sliced fresh',
                  'Hand-stretched rumali roti, off the tawa',
                  'House mint-coriander chutney',
                  'Sliced red onions',
                  'A squeeze of fresh lime',
                  'Rolled to order, never pre-assembled',
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
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Chicken Roll in Noida</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-mk-black border border-white/10 hover:border-mk-orange/30 transition-colors">
                  <summary className="font-body font-semibold text-white p-5 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-mk-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="font-body text-white/60 text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-mk-black text-center">
          <h2 className="font-display text-4xl text-white mb-4">Order Your Roll</h2>
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
              <Link href="/kati-roll-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Kati Roll Noida
              </Link>
              <Link href="/tandoori-chicken-noida-sector-75" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Tandoori Chicken Sector 75
              </Link>
              <Link href="/chicken-biryani-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Biryani Noida
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
