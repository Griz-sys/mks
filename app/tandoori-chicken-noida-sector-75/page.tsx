import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Best Tandoori Chicken in Noida Sector 75 | MK's Restaurant",
  description:
    "Looking for the best tandoori chicken in Noida Sector 75? MK's serves authentic clay tandoor roasted chicken — marinated overnight, never fried. Starting ₹199. Call +91 80763 74624.",
  keywords: [
    'tandoori chicken noida sector 75',
    'tandoori chicken noida',
    'best tandoori chicken near me noida',
    'clay tandoor chicken noida',
    'tandoor chicken sector 75',
    "MK's tandoori chicken",
  ],
  alternates: { canonical: 'https://www.mkstandoori.in/tandoori-chicken-noida-sector-75' },
  openGraph: {
    title: "Best Tandoori Chicken in Noida Sector 75 — MK's",
    description:
      "Authentic clay tandoor chicken in Noida Sector 75. Roasted at 450°C. Starting ₹199.",
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: "MK's",
  servesCuisine: 'Indian',
  hasMenuItem: [
    {
      '@type': 'MenuItem',
      name: 'Classic Chicken 2 Pc',
      description: 'Classic tandoori chicken — marinated overnight in yoghurt and spices, roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '180', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Classic Chicken 4 Pc',
      offers: { '@type': 'Offer', price: '350', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Creamy Chicken 2 Pc',
      description: 'Creamy marinated tandoori chicken roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '190', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Classic Chicken Tikka 4 Pc',
      description: 'Classic boneless chicken tikka pieces roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '350', priceCurrency: 'INR' },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  telephone: '+91-8076374624',
}

const faqs = [
  {
    q: 'Where can I get the best tandoori chicken in Noida Sector 75?',
    a: "MK’s at Spectrum Metro Mall, Phase-2, Sector 75 is rated among the best tandoori chicken spots in Noida. We roast in a clay tandoor at 450°C — no frying, ever.",
  },
  {
    q: "Is MK’s tandoori chicken fried or roasted?",
    a: "Roasted — always. MK’s was built on the principle of zero frying. Every piece goes straight into our 450°C clay tandoor after an overnight marinade.",
  },
  {
    q: "What is the price of tandoori chicken at MK’s?",
    a: "Classic Chicken starts at Rs.180 (2 pc) or Rs.350 (4 pc). Creamy Chicken is Rs.190 (2 pc). Chicken Tikka starts at Rs.350 (4 pc). Classic Chicken Roll is Rs.180.",
  },
  {
    q: "Does MK’s offer home delivery for tandoori chicken in Noida?",
    a: "Call us at +91 80763 74624 for delivery details. We’re also available on popular food delivery platforms.",
  },
  {
    q: "What makes MK's tandoori chicken different?",
    a: 'Overnight 12-hour marinade in our house blend, cooked in a traditional clay tandoor (not an electric oven), and served fresh — never reheated.',
  },
]

export default function TandooriChickenPage() {
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mkstandoori.in' },
      { '@type': 'ListItem', position: 2, name: 'Tandoori Chicken Noida Sector 75', item: 'https://www.mkstandoori.in/tandoori-chicken-noida-sector-75' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-mk-charcoal pt-20">
        <Image
          src="/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp"
          alt="Smoking tandoori chicken leg piece — MK's Noida Sector 75"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Tandoori Chicken Noida Sector 75</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Tandoori Chicken<br />
            <span className="text-mk-orange">Noida Sector 75</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Roasted at 450°C in a clay tandoor. Marinated 12 hours. Never fried.
          </p>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              About Our Tandoori Chicken
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Why MK&apos;s Is Noida&apos;s Go-To for Tandoori Chicken
            </h2>
            <div className="prose prose-invert prose-lg font-body text-white/60 space-y-4">
              <p>
                If you&apos;ve been searching for <strong className="text-white">tandoori chicken in Noida Sector 75</strong>,
                MK&apos;s is where that search ends. Located close to the Sector 75 corridor at Spectrum Mall,
                we&apos;ve built our entire restaurant around one dish — and we take it seriously.
              </p>
              <p>
                Traditional tandoori chicken is defined by three things: the marinade, the heat,
                and the vessel. At MK&apos;s, we don&apos;t cut corners on any of them. Our chicken
                marinates for a minimum of 12 hours in yoghurt, ginger-garlic paste, and a dry spice
                blend we&apos;ve refined over years. It then goes into a clay tandoor — not an electric
                oven, not a grill — where temperatures exceed 450°C, creating the signature char,
                crisp skin, and smoky depth that defines the dish.
              </p>
              <p>
                The result? Juicy on the inside, beautifully charred on the outside, and packed
                with flavour that no frying process can replicate. This is what &ldquo;roasted, not
                fried&rdquo; means at MK&apos;s.
              </p>
            </div>
          </div>
        </section>

        {/* Menu section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-3">
                Tandoori Specials Menu
              </h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Classic Chicken 2 Pc', price: '₹180', desc: 'Classic tandoori marinade. Roasted to order in clay tandoor. Served with mint chutney & onions.' },
                { name: 'Classic Chicken 4 Pc', price: '₹350', desc: 'Four pieces — best for sharing. Classic spice marinade, zero frying.' },
                { name: 'Classic Chicken 8 Pc', price: '₹650', desc: 'Eight pieces — perfect for a group. The full MK\'s classic experience.' },
                { name: 'Creamy Chicken 2 Pc', price: '₹190', desc: 'Creamy marinade with a rich, mellow spice profile. Still roasted, never fried.' },
                { name: 'Creamy Chicken 4 Pc', price: '₹380', desc: 'Four pieces of our popular creamy variant. Great for those who prefer milder spice.' },
                { name: 'Hot & Spicy Chicken Tikka 4 Pc', price: '₹380', desc: 'Boneless tikka with extra heat. For the spice lovers.' },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-body font-semibold text-white">{item.name}</h3>
                    </div>
                    <span className="font-display text-mk-orange text-xl ml-4 flex-shrink-0">{item.price}</span>
                  </div>
                  <p className="font-body text-white/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">
                How We Make It
              </h2>
              <p className="font-body text-white/40 text-sm uppercase tracking-widest">
                The MK&apos;s process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Overnight Marinade', body: 'Whole chicken pieces scored and submerged in our house marinade — yoghurt, ginger-garlic, red chilli, cumin, coriander, and our dry spice blend — for 12+ hours.' },
                { step: '02', title: 'Skewered & Fired', body: 'Pieces go onto iron skewers and straight into a 450°C clay tandoor. This high heat is what creates the char and seals in all the juices. No oil basting. No frying.' },
                { step: '03', title: 'Straight to You', body: 'Served fresh off the skewer — never reheated, never pre-cooked. With house mint chutney and fresh-cut onions. That&apos;s the MK&apos;s way.' },
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
              <h2 className="font-display text-4xl text-white mb-2">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-mk-black border border-white/10 hover:border-mk-orange/30 transition-colors"
                >
                  <summary className="font-body font-semibold text-white p-5 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-mk-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="font-body text-white/60 text-sm leading-relaxed px-5 pb-5">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-mk-black text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Ready to taste the roast?
          </h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Visit us at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75 — or call to order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918076374624"
              className="bg-mk-orange text-mk-black font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
              Call +91 80763 74624
            </a>
            <Link
              href="/#location"
              className="border border-white/20 text-white font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:border-mk-orange hover:text-mk-orange transition-colors"
            >
              Get Directions
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-body text-white/30 text-xs mb-4 uppercase tracking-widest">Also explore</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/chicken-biryani-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Chicken Biryani Noida
              </Link>
              <Link href="/family-restaurant-sector-75-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Family Restaurant Sector 75
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
