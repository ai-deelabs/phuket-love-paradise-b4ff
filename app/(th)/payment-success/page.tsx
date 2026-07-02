import type { Metadata } from 'next';
import PaymentSuccessView, { paymentSuccessSeo } from '@/components/views/PaymentSuccessView';
import { pageMeta } from '@/lib/meta';
import { paymentSuccessAlternates } from '@/lib/routes';

export const metadata: Metadata = pageMeta({
  lang: 'th',
  ...paymentSuccessSeo('th'),
  alternates: paymentSuccessAlternates(),
  noindex: true,
});

export default function Page() {
  return <PaymentSuccessView lang="th" />;
}
