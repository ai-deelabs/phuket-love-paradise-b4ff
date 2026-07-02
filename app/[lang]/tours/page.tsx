import type { Metadata } from 'next';
import CatalogView, { catalogSeo } from '@/components/views/CatalogView';
import type { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { catalogAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta({ lang, ...catalogSeo(lang), alternates: catalogAlternates() });
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <CatalogView lang={lang} />;
}
