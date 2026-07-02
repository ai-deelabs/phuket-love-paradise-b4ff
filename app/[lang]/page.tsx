import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CatalogView, { catalogSeo } from '@/components/views/CatalogView';
import HomeView, { homeSeo } from '@/components/views/HomeView';
import HowToBookView, { howToBookSeo } from '@/components/views/HowToBookView';
import { PREFIXED_LOCALES, type Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { catalogAlternates, homeAlternates, howToBookAlternates } from '@/lib/routes';
import { devEncodedVariants } from '@/lib/dev-params';

type Params = Promise<{ lang: string }>;

// Besides /en/ and /ru/ home pages, this dynamic segment also serves the two
// top-level Thai keyword pages. They must be dynamic (not literal Thai-named
// route folders) because the dev server matches URL segments in their
// percent-encoded form, which literal non-ASCII folders never equal.
const THAI_PAGES = {
  'ทัวร์ภูเก็ต': 'catalog',
  'วิธีจอง': 'how-to-book',
} as const;

export function generateStaticParams() {
  const segments: string[] = [...PREFIXED_LOCALES, ...Object.keys(THAI_PAGES)];
  return segments.flatMap((seg) => devEncodedVariants(seg)).map((lang) => ({ lang }));
}
export const dynamicParams = false;

function resolve(segment: string): { kind: 'home'; lang: Lang } | { kind: 'catalog' | 'how-to-book' } | null {
  const decoded = decodeURIComponent(segment);
  if ((PREFIXED_LOCALES as string[]).includes(decoded)) return { kind: 'home', lang: decoded as Lang };
  const page = THAI_PAGES[decoded as keyof typeof THAI_PAGES];
  if (page === 'catalog') return { kind: 'catalog' };
  if (page === 'how-to-book') return { kind: 'how-to-book' };
  return null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const target = resolve((await params).lang);
  if (!target) return {};
  if (target.kind === 'home')
    return pageMeta({ lang: target.lang, ...homeSeo(target.lang), alternates: homeAlternates() });
  if (target.kind === 'catalog')
    return pageMeta({ lang: 'th', ...catalogSeo('th'), alternates: catalogAlternates() });
  return pageMeta({ lang: 'th', ...howToBookSeo('th'), alternates: howToBookAlternates() });
}

export default async function Page({ params }: { params: Params }) {
  const target = resolve((await params).lang);
  if (!target) notFound();
  if (target.kind === 'home') return <HomeView lang={target.lang} />;
  if (target.kind === 'catalog') return <CatalogView lang="th" />;
  return <HowToBookView lang="th" />;
}
