import type { Metadata } from 'next';
import CatalogView, { catalogSeo } from '@/components/views/CatalogView';
import { pageMeta } from '@/lib/meta';
import { catalogAlternates } from '@/lib/routes';

export const metadata: Metadata = pageMeta({
  lang: 'th',
  ...catalogSeo('th'),
  alternates: catalogAlternates(),
});

export default function Page() {
  return <CatalogView lang="th" />;
}
