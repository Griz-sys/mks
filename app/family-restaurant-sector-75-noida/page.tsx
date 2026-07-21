import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Family Restaurant in Sector 75 Noida | MK's — Dine Together",
  description:
    "Planning a family meal in Noida Sector 75? MK's offers a warm, welcoming dining experience with authentic tandoori food for the whole family. Call +91 80763 74624.",
  keywords: [
    'family restaurant sector 75 noida',
    'best family restaurant noida',
    'restaurant for families noida',
    'family dining sector 75',
    'family friendly restaurant noida',
    "MK's family restaurant",
  ],
  alternates: { canonical: 'https://www.mkstandoori.com/family-restaurant-sector-75-noida' },
  openGraph: {
    title: "Family Restaurant in Sector 75 Noida | MK's",
    description: 'Warm, welcoming family dining in Noida Sector 75. Authentic tandoori food for all ages.',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "MK's",
  description: "Family restaurant in Noida Sector 75 serving authentic tandoori food for all ages.",
  servesCuisine: 'Indian',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  telephone: '+91-8076374624',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '11:00',
      closes: '23:00',
    },
  ],
  priceRange: '₹₹',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Family-Friendly', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioned', value: true },
  ],
}

const faqs = [
  {
    q: "Is MK's a good family restaurant in Sector 75 Noida?",
    a: "Yes — MK's is designed for all ages. Our menu has something for everyone: tandoori chicken and biryani for adults, rolls and paneer tikka for kids and vegetarians.",
  },
  {
    q: "Where exactly is MK's located near Sector 75?",
    a: "MK's is at Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75 — a short drive or auto ride from Sector 75. It's very close to the Sector 75 metro station as well.",
  },
  {
    q: "Does MK's have vegetarian options for family dining?",
    a: "Absolutely. We have Paneer Tikka, Veg Biryani, Paneer Tikka Roll, Dal Makhani, Tandoori Roti, and Raita for vegetarians in the family.",
  },
  {
    q: "What time does MK's open for family dining?",
    a: "We're open every day from 11:00 AM to 11:00 PM — including weekends and public holidays.",
  },
  {
    q: "Can I book a table at MK's for a family gathering?",
    a: "Call us at +91 80763 74624 to reserve a table or enquire about group bookings for family gatherings.",
  },
]

export default function FamilyRestaurantPage() {
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mkstandoori.com' },
      { '@type': 'ListItem', position: 2, name: 'Family Restaurant Sector 75 Noida', item: 'https://www.mkstandoori.com/family-restaurant-sector-75-noida' },
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
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&fit=crop"
          alt="Warm family restaurant interior — MK's Noida Sector 75"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-charcoal via-mk-charcoal/60 to-transparent" />
        <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto w-full">
          <nav className="font-body text-xs text-white/40 mb-4 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mk-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-mk-orange">Family Restaurant Sector 75 Noida</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-4">
            Family Restaurant<br />
            <span className="text-mk-orange">Sector 75, Noida</span>
          </h1>
          <p className="font-tagline text-xl text-white/70 max-w-xl">
            Warm. Welcoming. Authentic Indian food for the whole family — every day, 11am to 11pm.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-mk-charcoal">

        {/* Intro */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">
              Family Dining in Noida
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              Where Noida Families Eat Well
            </h2>
            <div className="space-y-4 font-body text-white/60 leading-relaxed">
              <p>
                Finding a <strong className="text-white">family restaurant in Sector 75, Noida</strong> that
                satisfies everyone around the table isn&apos;t easy — you need options for the
                vegetarians, the chicken lovers, the kids, and the grandparents who want proper
                Indian food, not a pale imitation.
              </p>
              <p>
                MK&apos;s is built exactly for that. Our menu spans authentic tandoori chicken
                (our signature), rich biryani, fresh rolls for the kids, paneer dishes for
                vegetarians, and comforting dal makhani and breads to round out a full family spread.
              </p>
              <p>
                We&apos;re open seven days a week from 11:00 AM to 11:00 PM. Whether it&apos;s a
                weeknight dinner, a weekend lunch outing, or a birthday celebration — we&apos;re
                ready for your family.
              </p>
            </div>
          </div>
        </section>

        {/* For every member */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Something for Everyone</span>
              <h2 className="font-display text-4xl text-white mt-3 mb-4">For Every Member of the Table</h2>
              <div className="w-10 h-1 bg-mk-orange mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🍗',
                  who: 'For the Meat Lovers',
                  items: ['Tandoori Chicken (Half/Full)', 'Chicken Tikka', 'Seekh Kebab', 'Chicken Biryani', 'Mutton Biryani'],
                },
                {
                  icon: '🌿',
                  who: 'For Vegetarians',
                  items: ['Paneer Tikka', 'Veg Biryani', 'Paneer Tikka Roll', 'Dal Makhani', 'Garlic Naan + Raita'],
                },
                {
                  icon: '🧒',
                  who: 'For the Kids',
                  items: ['Tandoori Chicken Roll (mild)', 'Paneer Tikka Roll', 'Seekh Kebab', 'Butter Chicken + Naan', 'Tandoori Roti'],
                },
              ].map((group) => (
                <div key={group.who} className="bg-mk-black border border-white/10 p-6">
                  <span className="text-4xl block mb-3">{group.icon}</span>
                  <h3 className="font-display text-xl text-white mb-4">{group.who}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-white/60">
                        <span className="w-1 h-1 bg-mk-orange rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">The Experience</span>
              <h2 className="font-display text-4xl text-white mt-3 mb-6">
                Dining at MK&apos;s
              </h2>
              <div className="space-y-6">
                {[
                  { icon: '🕐', title: 'Open Every Day', body: 'Monday to Sunday, 11:00 AM – 11:00 PM. No closed days.' },
                  { icon: '📍', title: 'Easy to Find', body: 'Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida — a short drive from Sector 75. Ample parking.' },
                  { icon: '📞', title: 'Book a Table', body: 'Call +91 80763 74624 to reserve your table or ask about group bookings for family gatherings.' },
                  { icon: '🚴', title: 'Delivery Too', body: 'Can\'t make it in? Order delivery through our phone line or popular food delivery apps.' },
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
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&fit=crop"
                alt="Family dining at MK's — authentic Indian food Noida Sector 75"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mk-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Quick family meal idea */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-body text-mk-orange text-xs uppercase tracking-[0.4em]">Suggestion</span>
            <h2 className="font-display text-4xl text-white mt-3 mb-6">
              A Perfect Family Spread
            </h2>
            <p className="font-body text-white/50 mb-8">For a family of 4, we recommend:</p>
            <div className="bg-mk-black border border-mk-orange/20 p-8 text-left">
              <ul className="space-y-3">
                {[
                  { name: 'Tandoori Chicken (Full)', price: '₹349', note: 'Share across the table' },
                  { name: 'Paneer Tikka', price: '₹199', note: 'For the vegetarians' },
                  { name: 'Chicken Biryani × 2', price: '₹498', note: 'One per pair, or share' },
                  { name: 'Dal Makhani', price: '₹159', note: 'Rich, everyone loves it' },
                  { name: 'Garlic Naan × 4', price: '₹236', note: 'Mandatory' },
                  { name: 'Raita', price: '₹49', note: 'To cool things down' },
                ].map((item) => (
                  <li key={item.name} className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <span className="font-body text-white text-sm">{item.name}</span>
                      <span className="font-body text-white/30 text-xs block">{item.note}</span>
                    </div>
                    <span className="font-display text-mk-orange">{item.price}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-2">
                  <span className="font-body font-bold text-white uppercase tracking-widest text-sm">Total</span>
                  <span className="font-display text-mk-orange text-2xl">≈ ₹1,490</span>
                </li>
              </ul>
              <p className="font-body text-white/30 text-xs mt-4">For 4 people. Adjust quantities as needed.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 bg-mk-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-white mb-2">
                FAQs — Family Restaurant Sector 75
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border border-white/10 hover:border-mk-orange/30 transition-colors">
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
        <section className="py-20 px-4 text-center">
          <h2 className="font-display text-4xl text-white mb-4">Bring the Family</h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Shop No. 33, E Block, Spectrum Metro Mall, Phase-2, Sector 75, Noida. Open daily 11am–11pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+918076374624" className="bg-mk-orange text-mk-black font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Reserve a Table
            </a>
            <Link href="/#menu" className="border border-white/20 text-white font-body font-bold px-10 py-4 uppercase tracking-widest text-sm hover:border-mk-orange hover:text-mk-orange transition-colors">
              View Full Menu
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-body text-white/30 text-xs mb-4 uppercase tracking-widest">Also explore</p>
            <div className="flex flex-wrap gap-3 justify-center">
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
