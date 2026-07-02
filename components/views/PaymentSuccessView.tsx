import Icon from '../Icon';
import PaymentSuccessClient from '../PaymentSuccessClient';
import SiteShell from '../SiteShell';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { homeUrl, paymentSuccessAlternates } from '@/lib/routes';
import { LINE_ID, PHONE_DISPLAY } from '@/lib/site';

export const paymentSuccessSeo = (lang: Lang) => ({
  title: {
    th: 'ได้รับมัดจำแล้ว | Phuket Love Paradise',
    en: 'Deposit Received | Phuket Love Paradise',
    ru: 'Депозит получен | Phuket Love Paradise',
  }[lang],
  description: {
    th: 'การชำระมัดจำสำเร็จ',
    en: 'Deposit payment successful',
    ru: 'Депозит успешно оплачен',
  }[lang],
});

export default function PaymentSuccessView({ lang }: { lang: Lang }) {
  const t = useT(lang);
  return (
    <SiteShell lang={lang} alternates={paymentSuccessAlternates()}>
      <PaymentSuccessClient />
      <section className="sec" style={{ paddingTop: '9rem', textAlign: 'center', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ color: 'var(--gold)', display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <Icon name="circle-check" size={56} />
          </div>
          <h1 className="sec-title">{t('pay.title')}</h1>
          <p className="sec-desc" style={{ margin: '0 auto 1.5rem' }}>{t('pay.body')}</p>
          <p className="sec-desc" style={{ margin: '0 auto 2rem' }}>
            LINE {LINE_ID} · {PHONE_DISPLAY}
          </p>
          <a className="btn-navy" href={homeUrl(lang)}>
            {t('pay.home')}
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
