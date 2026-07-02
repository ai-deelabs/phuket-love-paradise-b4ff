import type { MetadataRoute } from 'next';
import { getCategories, getTours } from '@/lib/content';
import { HREFLANG, LOCALES, type Lang } from '@/lib/i18n';
import {
  abs,
  catalogUrl,
  categoryUrl,
  homeUrl,
  howToBookUrl,
  tourUrl,
  type Alternates,
} from '@/lib/routes';

export const dynamic = 'force-static';

const forAll = (fn: (l: Lang) => string): Alternates =>
  Object.fromEntries(LOCALES.map((l) => [l, fn(l)])) as Alternates;

function entries(alternates: Alternates): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [HREFLANG[l], abs(alternates[l])]),
  );
  return LOCALES.map((l) => ({
    url: abs(alternates[l]),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    ...entries(forAll(homeUrl)),
    ...entries(forAll(catalogUrl)),
    ...entries(forAll(howToBookUrl)),
  ];
  for (const cat of getCategories()) out.push(...entries(forAll((l) => categoryUrl(cat, l))));
  for (const tour of getTours()) out.push(...entries(forAll((l) => tourUrl(tour, l))));
  return out;
}
