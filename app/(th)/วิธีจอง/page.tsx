import type { Metadata } from 'next';
import HowToBookView, { howToBookSeo } from '@/components/views/HowToBookView';
import { pageMeta } from '@/lib/meta';
import { howToBookAlternates } from '@/lib/routes';

export const metadata: Metadata = pageMeta({
  lang: 'th',
  ...howToBookSeo('th'),
  alternates: howToBookAlternates(),
});

export default function Page() {
  return <HowToBookView lang="th" />;
}
