import type { Metadata } from 'next';
import PaymentSuccessView, { paymentSuccessSeo } from '@/components/views/PaymentSuccessView';
import type { Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { paymentSuccessAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta({
    lang,
    ...paymentSuccessSeo(lang),
    alternates: paymentSuccessAlternates(),
    noindex: true,
  });
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <PaymentSuccessView lang={lang} />;
}
