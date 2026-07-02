import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourView from '@/components/views/TourView';
import { getTours } from '@/lib/content';
import { PREFIXED_LOCALES, type Lang } from '@/lib/i18n';
import { heroSrc } from '@/lib/images';
import { pageMeta } from '@/lib/meta';
import { tourAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((lang) =>
    getTours().map((tour) => ({ lang, slug: tour.data.slugs[lang] })),
  );
}
export const dynamicParams = false;

function find(lang: Lang, slug: string) {
  return getTours().find((tour) => tour.data.slugs[lang] === decodeURIComponent(slug));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Lang;
  const tour = find(lang, slug);
  if (!tour) return {};
  return pageMeta({
    lang,
    title: tour.data.seo.title[lang],
    description: tour.data.seo.description[lang],
    alternates: tourAlternates(tour),
    ogImage: heroSrc(tour.data.hero),
  });
}

export default async function Page({ params }: { params: Params }) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Lang;
  const tour = find(lang, slug);
  if (!tour) notFound();
  return <TourView lang={lang} tour={tour} />;
}
