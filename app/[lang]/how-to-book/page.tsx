import type { Metadata } from 'next';
import HowToBookView, { howToBookSeo } from '@/components/views/HowToBookView';
import type { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { howToBookAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta({ lang, ...howToBookSeo(lang), alternates: howToBookAlternates() });
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <HowToBookView lang={lang} />;
}
