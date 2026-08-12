import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PHONE_SECONDARY, PHONE_SECONDARY_TEL, ADDRESS_LINE_1, HOURS } from '../lib/constants'

export const metadata: Metadata = {
  title: { absolute: "North Indian Restaurant in Noida | MK's — Near Sector 75" },
  description:
    "Looking for a North Indian restaurant near you in Noida? MK's serves tandoori chicken, chicken tikka, soya chaap & rolls — roasted, never fried. Sector 75. Call +91 80763 74624.",
  keywords: [
    'north indian restaurant noida',
    'restaurant near me',
    'best restaurant near me noida',
    'north indian restaurant sector 75',
    'tandoori restaurant near me noida',
    "MK's restaurant noida",
  ],
  alternates: { canonical: 'https://mkstandoori.com/north-indian-restaurant-noida' },
  openGraph: {
    title: "North Indian Restaurant in Noida — MK's, Sector 75",
    description: 'Tandoori chicken, chicken tikka, soya chaap & rolls. Roasted, never fried. Open daily 11am–11pm.',
    type: 'website',
    images: [{ url: 'https://mkstandoori.com/og-north-indian-restaurant.jpg', width: 1200, height: 630, alt: "Tandoori chicken platter — MK's North Indian Restaurant, Noida" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "North Indian Restaurant in Noida — MK's, Sector 75",
    description: 'Tandoori chicken, chicken tikka, soya chaap & rolls. Roasted, never fried. Open daily 11am–11pm.',
    images: ['https://mkstandoori.com/og-north-indian-restaurant.jpg'],
  },
}

const faqs = [
  {
    q: "What's the best North Indian restaurant near me in Noida Sector 75?",
    a: "MK's, at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida, serves authentic North Indian tandoori food — tandoori chicken, chicken tikka, soya chaap and rolls, all roasted in a clay tandoor.",
  },
  {
    q: "What kind of food does MK's serve?",
    a: "North Indian tandoori cuisine — tandoori chicken, chicken tikka, soya chaap, and rumali roti rolls. Everything is roasted in a clay tandoor at 450°C, never fried.",
  },
  {
    q: "What are MK's timings?",
    a: `We're open every day, ${HOURS.replace('Every day · ', '')}, including weekends and public holidays.`,
  },
  {
    q: "Does MK's have vegetarian options?",
    a: "Yes — Soya Chaap (Classic, Creamy/Malai, and Achari) and a Classic Soya Roll are both on the menu, alongside our tandoori chicken dishes.",
  },
  {
    q: "Is MK's available for delivery or takeaway near Sector 75?",
    a: "Yes — call +91 80763 74624, or find us on Swiggy and Zomato for delivery. Walk-ins and takeaway are also welcome at our Spectrum Metro Mall counter.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "MK's",
  description: "North Indian tandoori restaurant in Noida Sector 75, serving tandoori chicken, chicken tikka, soya chaap and rolls.",
  servesCuisine: 'North Indian',
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '11:00',
      closes: '23:00',
    },
  ],
  priceRange: '₹₹',
}

export default function NorthIndianRestaurantPage() {
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
      { '@type': 'ListItem', position: 2, name: 'North Indian Restaurant Noida', item: 'https://mkstandoori.com/north-indian-restaurant-noida' },
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
          src="/classic-chicken-tandoori.jpg"
          alt="Tandoori chicken platter — MK's North Indian Restaurant, Noida"
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
            <span className="text-mk-orange">North Indian Restaurant Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            North Indian Restaurant<br />
            <span className="text-mk-orange">Near You in Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Tandoori chicken, chicken tikka, soya chaap &amp; rolls. Roasted, not fried. Sector 75.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              About MK&apos;s
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              A North Indian Restaurant Built Around One Idea
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                Typing <strong className="text-white">&ldquo;restaurant near me&rdquo;</strong> or{' '}
                <strong className="text-white">&ldquo;North Indian restaurant in Noida&rdquo;</strong> usually
                turns up a long list. MK&apos;s, at Spectrum Metro Mall in Sector 75, is built around
                one simple rule that sets it apart from most of that list: everything is roasted in
                a clay tandoor, never fried.
              </p>
              <p>
                That rule runs through our whole North Indian menu — bone-in tandoori chicken,
                boneless chicken tikka, soya chaap for vegetarians, and rumali-roti rolls for
                something quick. Every dish starts with an overnight marinade
                and finishes in a 450°C clay tandoor.
              </p>
              <p>
                We&apos;re open every day, 11:00 AM to 11:00 PM, with dine-in, takeaway, and delivery
                through Swiggy and Zomato.
              </p>
            </div>
          </div>
        </section>

        {/* Menu hub */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Our Menu</span>
              <h2 className="font-display text-4xl text-white mt-3 mb-4">What We&apos;re Known For</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { href: '/tandoori-chicken-noida-sector-75', title: 'Tandoori Chicken', desc: 'Bone-in, overnight marinated, clay tandoor roasted.', price: 'From ₹180' },
                { href: '/chicken-tikka-noida', title: 'Chicken Tikka', desc: 'Boneless, Classic, Creamy or Hot & Spicy.', price: 'From ₹350' },
                { href: '/soya-chaap-noida', title: 'Soya Chaap', desc: 'Classic, Malai (Creamy), or Achari — always roasted.', price: '₹250' },
                { href: '/malai-chaap-noida', title: 'Malai Chaap', desc: 'Rich cream marinade on soya chaap sticks.', price: '₹250' },
                { href: '/chicken-roll-noida', title: 'Chicken Roll', desc: 'Tandoori chicken in fresh rumali roti with chutney.', price: '₹180' },
                { href: '/kati-roll-noida', title: 'Kati Roll', desc: 'Kolkata-style, skewer-roasted chicken or soya chaap.', price: 'From ₹150' },
              ].map((dish) => (
                <Link
                  key={dish.href}
                  href={dish.href}
                  className="bg-mk-black border border-white/10 hover:border-mk-orange/40 transition-colors p-6 flex flex-col"
                >
                  <h3 className="font-body font-semibold text-white text-lg mb-1">{dish.title}</h3>
                  <span className="font-display text-mk-orange text-lg mb-3">{dish.price}</span>
                  <p className="font-body text-white/40 text-sm flex-1">{dish.desc}</p>
                  <span className="font-body text-xs text-mk-orange uppercase tracking-widest mt-4">View menu &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Why MK&apos;s</span>
              <h2 className="font-display text-3xl text-white mt-3 mb-6">Roasted. Not Fried. Every Time.</h2>
              <div className="space-y-6">
                {[
                  { icon: '🔥', title: 'Clay Tandoor, 450°C', body: 'Every non-veg and veg tandoor dish goes into a real clay tandoor — not an electric oven or deep fryer.' },
                  { icon: '🕐', title: 'Open Every Day', body: 'Monday to Sunday, 11:00 AM – 11:00 PM. No closed days.' },
                  { icon: '📍', title: 'Easy to Find', body: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida. Ample parking.' },
                  { icon: '🚴', title: 'Dine-in, Takeaway & Delivery', body: 'Eat in, pick up at the counter, or order through Swiggy and Zomato.' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                    <div>
                      <h3 className="font-body font-semibold text-white text-sm mb-1">{feature.title}</h3>
                      <p className="font-body text-white/50 text-sm">{feature.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/l-intro-1607603831.jpg"
                alt="Chicken sizzling over the open tandoor flame at MK's, Noida"
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">FAQs — North Indian Restaurant Noida</h2>
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
          <h2 className="font-display text-4xl text-white mb-4">Visit or Order From MK&apos;s</h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida. Open daily 11am–11pm.
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
            <p className="font-body text-white/30 text-xs mb-4 uppercase tracking-widest">Explore our menu</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/tandoori-chicken-noida-sector-75" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Tandoori Chicken
              </Link>
              <Link href="/family-restaurant-sector-75-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Family Restaurant
              </Link>
              <Link href="/malai-chaap-noida" className="font-body text-xs text-white/40 hover:text-mk-orange transition-colors uppercase tracking-widest border border-white/10 px-4 py-2">
                Malai Chaap
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
