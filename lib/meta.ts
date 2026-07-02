import type { Metadata } from 'next';
import { DEFAULT_LANG, HREFLANG, OG_LOCALES, type Lang } from './i18n';
import { abs, type Alternates } from './routes';
import { SITE_NAME } from './site';

interface PageMetaInput {
  lang: Lang;
  title: string;
  description: string;
  alternates: Alternates;
  ogImage?: string;
  noindex?: boolean;
}

/** Builds the Next Metadata object: canonical + hreflang cluster + OG. */
export function pageMeta({ lang, title, description, alternates, ogImage, noindex }: PageMetaInput): Metadata {
  const canonical = abs(alternates[lang]);
  return {
    title,
    description,
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {
          alternates: {
            canonical,
            languages: {
              ...Object.fromEntries(
                (Object.keys(alternates) as Lang[]).map((l) => [HREFLANG[l], abs(alternates[l])]),
              ),
              'x-default': abs(alternates[DEFAULT_LANG]),
            },
          },
        }),
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[lang],
      type: 'website',
      ...(ogImage && { images: [{ url: abs(ogImage) }] }),
    },
    twitter: { card: ogImage ? 'summary_large_image' : 'summary' },
  };
}
