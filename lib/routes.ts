import type { Category, Tour } from './content';
import { DEFAULT_LANG, LOCALES, type Lang } from './i18n';

const base = (lang: Lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);

export const homeUrl = (lang: Lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);

export const catalogUrl = (lang: Lang) =>
  lang === DEFAULT_LANG ? '/ทัวร์ภูเก็ต/' : `/${lang}/tours/`;

export const categoryUrl = (cat: Category, lang: Lang) =>
  `${base(lang)}/tour-category/${cat.data.slugs[lang]}/`;

export const tourUrl = (tour: Tour, lang: Lang) => `${base(lang)}/tour/${tour.data.slugs[lang]}/`;

export const cartUrl = (lang: Lang) => `${base(lang)}/cart/`;

export const paymentSuccessUrl = (lang: Lang) => `${base(lang)}/payment-success/`;

export const howToBookUrl = (lang: Lang) =>
  lang === DEFAULT_LANG ? '/วิธีจอง/' : `/${lang}/how-to-book/`;

export type Alternates = Record<Lang, string>;

const forAll = (fn: (lang: Lang) => string): Alternates =>
  Object.fromEntries(LOCALES.map((l) => [l, fn(l)])) as Alternates;

export const homeAlternates = () => forAll(homeUrl);
export const catalogAlternates = () => forAll(catalogUrl);
export const categoryAlternates = (cat: Category) => forAll((l) => categoryUrl(cat, l));
export const tourAlternates = (tour: Tour) => forAll((l) => tourUrl(tour, l));
export const cartAlternates = () => forAll(cartUrl);
export const paymentSuccessAlternates = () => forAll(paymentSuccessUrl);
export const howToBookAlternates = () => forAll(howToBookUrl);

export const SITE_URL = 'https://phuketloveparadise.com';
export const abs = (path: string) => new URL(path, SITE_URL).href;
