import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Best Tandoori Chicken in Noida Sector 75 | MK's Restaurant",
  description:
    "Looking for the best tandoori chicken in Noida Sector 75? MK's serves authentic clay tandoor roasted chicken — marinated overnight, never fried. Starting ₹199. Call +91 77973 39211.",
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
      name: 'Tandoori Chicken (Half)',
      description: 'Half chicken marinated overnight in yoghurt and spices, roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '199', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Tandoori Chicken (Full)',
      description: 'Full chicken marinated overnight in yoghurt and spices, roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '349', priceCurrency: 'INR' },
    },
    {
      '@type': 'MenuItem',
      name: 'Chicken Tikka (6 pcs)',
      description: 'Boneless chicken tikka pieces marinated and roasted in clay tandoor.',
      offers: { '@type': 'Offer', price: '249', priceCurrency: 'INR' },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Spectrum Mall, Sector 50',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  telephone: '+91-7797339211',
}

const faqs = [
  {
    q: 'Where can I get the best tandoori chicken in Noida Sector 75?',
    a: "MK's at Spectrum Mall (near Sector 75 Metro) is rated among the best tandoori chicken spots in Noida. We roast in a clay tandoor at 450°C — no frying, ever.",
  },
  {
    q: "Is MK’s tandoori chicken fried or roasted?",
    a: "Roasted — always. MK’s was built on the principle of zero frying. Every piece goes straight into our 450°C clay tandoor after an overnight marinade.",
  },
  {
    q: "What is the price of tandoori chicken at MK’s?",
    a: 'Tandoori Chicken (Half) starts at ₹199. Full chicken is ₹349. Chicken Tikka (6 pcs) is ₹249. Seekh Kebab (4 pcs) is ₹229.',
  },
  {
    q: "Does MK’s offer home delivery for tandoori chicken in Noida?",
    a: "Call us at +91 77973 39211 for delivery details. We're also available on popular food delivery platforms.",
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
                { name: 'Tandoori Chicken (Half)', price: '₹199', desc: '4 pieces — 2 legs, 2 breast. Served with mint chutney & onion rings.' },
                { name: 'Tandoori Chicken (Full)', price: '₹349', desc: '8 pieces — whole chicken portioned. Best for 2–3 people.' },
                { name: 'Chicken Tikka (6 pcs)', price: '₹249', desc: 'Boneless breast chunks marinated and roasted. Tender, no bones.' },
                { name: 'Seekh Kebab (4 pcs)', price: '₹229', desc: 'Minced chicken on iron skewers with chilli and coriander.' },
                { name: 'Paneer Tikka', price: '₹199', veg: true, desc: 'Chunky cottage cheese cubes in a smoky tandoor marinade.' },
              ].map((item) => (
                <div key={item.name} className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {item.veg && (
                        <span className="inline-block w-4 h-4 border border-green-500 flex-shrink-0 flex items-center justify-center">
                          <span className="block w-2 h-2 bg-green-500 rounded-full" />
                        </span>
                      )}
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
            Visit us at Spectrum Mall, Sector 50 — or call to order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917797339211"
              className="bg-mk-orange text-mk-black font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
              Call +91 77973 39211
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
