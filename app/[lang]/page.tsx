import type { Metadata } from 'next';
import HomeView, { homeSeo } from '@/components/views/HomeView';
import type { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { homeAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta({ lang, ...homeSeo(lang), alternates: homeAlternates() });
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <HomeView lang={lang} />;
}
