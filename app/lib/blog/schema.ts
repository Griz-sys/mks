import {
  ADDRESS_LINE_1,
  PHONE_SECONDARY_TEL,
  HOURS,
} from '@/app/lib/constants'
import { SITE_URL } from './config'
import type { Faq, PostMeta } from './types'

const RESTAURANT_GEO = { latitude: 28.5745, longitude: 77.3591 }

export function buildRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: "MK's Tandoori",
    servesCuisine: ['Indian', 'North Indian', 'Tandoori'],
    priceRange: '₹₹',
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
      latitude: RESTAURANT_GEO.latitude,
      longitude: RESTAURANT_GEO.longitude,
    },
    telephone: PHONE_SECONDARY_TEL.replace('tel:', ''),
    url: SITE_URL,
    openingHours: HOURS.replace('Every day · ', 'Mo-Su '),
  }
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: "MK's Tandoori",
    image: `${SITE_URL}/thumbnail.png`,
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
      latitude: RESTAURANT_GEO.latitude,
      longitude: RESTAURANT_GEO.longitude,
    },
    telephone: PHONE_SECONDARY_TEL.replace('tel:', ''),
    url: SITE_URL,
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFaqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function buildArticleSchema(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [`${SITE_URL}${post.ogImage}`],
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: "MK's Tandoori",
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: [post.targetKeyword, ...post.relatedKeywords].join(', '),
  }
}
