import type { Metadata } from 'next';
import CartView, { cartSeo } from '@/components/views/CartView';
import { pageMeta } from '@/lib/meta';
import { cartAlternates } from '@/lib/routes';

export const metadata: Metadata = pageMeta({
  lang: 'th',
  ...cartSeo('th'),
  alternates: cartAlternates(),
  noindex: true,
});

export default function Page() {
  return <CartView lang="th" />;
}
