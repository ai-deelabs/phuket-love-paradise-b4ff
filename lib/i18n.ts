export const LOCALES = ['th', 'en', 'ru'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'th';

/** Locales that live under a /prefix/ (everything except the default). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LANG);

export const LANG_LABELS: Record<Lang, string> = { th: 'ไทย', en: 'EN', ru: 'RU' };
export const OG_LOCALES: Record<Lang, string> = { th: 'th_TH', en: 'en_US', ru: 'ru_RU' };
export const HREFLANG: Record<Lang, string> = { th: 'th-TH', en: 'en', ru: 'ru' };

/** A translated value: pick the right language. */
export type L = { th: string; en: string; ru: string };
export const t = (value: L, lang: Lang): string => value[lang];
