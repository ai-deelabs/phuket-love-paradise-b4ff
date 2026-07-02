import type { Metadata } from 'next';
import CartView, { cartSeo } from '@/components/views/CartView';
import type { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { cartAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta({ lang, ...cartSeo(lang), alternates: cartAlternates(), noindex: true });
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <CartView lang={lang} />;
}
