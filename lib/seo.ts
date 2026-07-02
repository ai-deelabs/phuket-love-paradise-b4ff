import type { Tour } from './content';
import type { Lang } from './i18n';
import { EMAIL, PHONE, SITE_NAME } from './site';

/** JSON-LD builders. All URLs passed in must be absolute. */

export function travelAgencySchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: siteUrl,
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phuket',
      postalCode: '83000',
      addressCountry: 'TH',
    },
    openingHours: 'Mo-Su 08:00-20:00',
  };
}

export function productSchema(tour: Tour, lang: Lang, url: string, imageUrl: string) {
  const d = tour.data;
  const prices = d.variants.flatMap((v) => [v.adult, ...(v.child !== null ? [v.child] : [])]);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: d.title[lang],
    description: d.summary[lang],
    image: imageUrl,
    url,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'THB',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: d.variants.length,
      availability: 'https://schema.org/InStock',
      url,
    },
  };
}

export function touristTripSchema(tour: Tour, lang: Lang, url: string) {
  const d = tour.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: d.title[lang],
    description: d.summary[lang],
    url,
    touristType: 'Leisure',
    ...(d.itinerary.length > 0 && {
      itinerary: {
        '@type': 'ItemList',
        itemListElement: d.itinerary.map((step, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: step.time !== '—' ? `${step.time} — ${step.text[lang]}` : step.text[lang],
        })),
      },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
