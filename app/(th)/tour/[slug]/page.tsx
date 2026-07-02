import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourView from '@/components/views/TourView';
import { getTours } from '@/lib/content';
import { heroSrc } from '@/lib/images';
import { pageMeta } from '@/lib/meta';
import { tourAlternates } from '@/lib/routes';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.data.slugs.th }));
}
export const dynamicParams = false;

function find(slug: string) {
  return getTours().find((tour) => tour.data.slugs.th === decodeURIComponent(slug));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const tour = find((await params).slug);
  if (!tour) return {};
  return pageMeta({
    lang: 'th',
    title: tour.data.seo.title.th,
    description: tour.data.seo.description.th,
    alternates: tourAlternates(tour),
    ogImage: heroSrc(tour.data.hero),
  });
}

export default async function Page({ params }: { params: Params }) {
  const tour = find((await params).slug);
  if (!tour) notFound();
  return <TourView lang="th" tour={tour} />;
}
