import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Kati Roll in Noida | MK's Restaurant Sector 75",
  description:
    "Craving a Kolkata-style kati roll in Noida? MK's wraps tandoor-roasted chicken or soya chaap in a flaky rumali paratha with chutney. From ₹150. Near Sector 75.",
  keywords: [
    'kati roll noida',
    'best kati roll noida',
    'chicken kati roll noida',
    'kati roll sector 75 noida',
    'kolkata kati roll near me noida',
    "MK's kati roll",
  ],
  alternates: { canonical: 'https://mkstandoori.com/kati-roll-noida' },
  openGraph: {
    title: "Kati Roll in Noida — MK's Restaurant Sector 75",
    description: 'Kolkata-style kati roll — tandoor-roasted chicken or soya chaap, wrapped fresh. From ₹150.',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Where can I get a good kati roll in Noida?',
    a: "MK's near Sector 75 Noida (at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75) wraps tandoor-roasted chicken or soya chaap in a fresh rumali roti — the same idea as a classic Kolkata kati roll.",
  },
  {
    q: 'What is a kati roll?',
    a: 'A kati roll is a Kolkata street-food classic — skewer-roasted meat or paneer wrapped in a paratha or roti with onions, chutney, and a squeeze of lime. At MK\'s, we wrap our tandoor-roasted chicken or soya chaap the same way, in a fresh rumali roti.',
  },
  {
    q: "What kati roll options does MK's have?",
    a: 'Chicken Kati Roll at ₹180, made with our tandoori chicken, and a Soya Kati Roll at ₹150, made with tandoori soya chaap — both vegetarian and non-vegetarian eaters covered.',
  },
  {
    q: "Is MK's kati roll available for delivery in Noida?",
    a: "Yes — call +91 80763 74624 for delivery, or order through Swiggy or Zomato.",
  },
  {
    q: "What makes MK's kati roll different from a regular roll?",
    a: "The filling is skewer-roasted in a clay tandoor rather than cooked on a flat griddle, which is closer to how a traditional Kolkata kati roll is made — giving it that char and smokiness instead of a plain sautéed filling.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: ['Indian', 'Street Food', 'Kolkata'],
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Chicken Kati Roll',
      description: 'Tandoor-roasted chicken wrapped in fresh rumali roti with chutney and onions, Kolkata style.',
      offers: { '@type': 'Offer', price: '180', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Soya Kati Roll',
      description: 'Tandoor-roasted soya chaap wrapped in fresh rumali roti with chutney and onions, Kolkata style.',
      offers: { '@type': 'Offer', price: '150', priceCurrency: 'INR' },
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

export default function KatiRollPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Kati Roll Noida', item: 'https://mkstandoori.com/kati-roll-noida' },
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
          src="/Gemini_Generated_Image_3f92hf3f92hf3f92.png"
          alt="Kolkata-style kati roll with tandoori filling and chutney — MK's Noida"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Kati Roll Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Kati Roll<br />
            <span className="text-mk-orange">in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Kolkata-style, skewer-roasted filling. Chicken or Soya Chaap. From ₹150.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              The MK&apos;s Kati Roll
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Kolkata-Style Kati Roll, Noida Sector 75
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                A proper <strong className="text-white">kati roll</strong> is a Kolkata invention —
                originally skewer-roasted meat, wrapped in a paratha to eat with your hands, no
                plate required. It&apos;s a different tradition from a typical roadside chicken
                roll, and it&apos;s the one we&apos;ve built ours around at MK&apos;s.
              </p>
              <p>
                Instead of pan-frying the filling on a flat griddle, we skewer our chicken or
                soya chaap and roast it in a clay tandoor first — the same way we cook everything
                else on our menu. That gives the filling real char and smoke before it ever
                touches the roti.
              </p>
              <p>
                It&apos;s then wrapped in a fresh rumali roti with mint chutney, sliced onions, and
                lime — closer to the street-side original than the assembly-line version you&apos;ll
                find at most quick-service counters.
              </p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">Kati Roll Menu</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {[
                {
                  name: 'Chicken Kati Roll',
                  price: '₹180',
                  desc: 'Skewer-roasted tandoori chicken, rumali roti, mint chutney, onions.',
                  tag: 'Bestseller',
                },
                {
                  name: 'Soya Kati Roll',
                  price: '₹150',
                  desc: 'Skewer-roasted tandoori soya chaap, rumali roti, mint chutney, onions.',
                  tag: 'Veg',
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
              Wrapped to order, Kolkata style
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">How We Make It</h2>
              <p className="font-body text-white/40 text-sm uppercase tracking-widest">The MK&apos;s process</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Skewered & Marinated', body: 'Chicken or soya chaap is marinated in our house blend and threaded onto iron skewers, just like a kebab.' },
                { step: '02', title: 'Clay Tandoor Roasted', body: 'Roasted at high heat until charred and smoky — not sautéed on a flat pan, which is what sets a real kati roll apart.' },
                { step: '03', title: 'Wrapped Fresh', body: 'Sliced and wrapped in a hot rumali roti with mint chutney, onions, and lime — made only when you order.' },
              ].map((step) => (
                <div key={step.step} className="p-6 border border-white/10">
                  <span className="font-display text-5xl text-mk-orange/20 block mb-3">{step.step}</span>
                  <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">FAQs — Kati Roll in Noida</h2>
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
          <h2 className="font-display text-4xl text-white mb-4">Order Your Kati Roll</h2>
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
              <Link href="/soya-chaap-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Soya Chaap Noida
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
