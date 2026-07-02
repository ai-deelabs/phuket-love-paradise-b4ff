import type { Metadata } from 'next';
import HomeView, { homeSeo } from '@/components/views/HomeView';
import { pageMeta } from '@/lib/meta';
import { homeAlternates } from '@/lib/routes';

export const metadata: Metadata = pageMeta({
  lang: 'th',
  ...homeSeo('th'),
  alternates: homeAlternates(),
});

export default function Page() {
  return <HomeView lang="th" />;
}
