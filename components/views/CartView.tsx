import Breadcrumbs from '../Breadcrumbs';
import CartPageClient, { type CartConfig, type CatalogTour } from '../CartPageClient';
import SiteShell from '../SiteShell';
import { getTours } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { thumbSrc } from '@/lib/images';
import { cartAlternates, catalogUrl, homeUrl, tourUrl } from '@/lib/routes';
import { EMAIL, LINE_ID, WHATSAPP_NUMBER } from '@/lib/site';
import { uiSubset, useT } from '@/lib/ui';

export const cartSeo = (lang: Lang) => ({
  title: {
    th: 'ตะกร้าทัวร์ | Phuket Love Paradise',
    en: 'Tour Cart | Phuket Love Paradise',
    ru: 'Корзина туров | Phuket Love Paradise',
  }[lang],
  description: useT(lang)('cart.title'),
});

export default function CartView({ lang }: { lang: Lang }) {
  const t = useT(lang);

  // Per-locale catalog snapshot for the client renderer: prices/titles are
  // resolved from this build-time data, never trusted from localStorage.
  const catalog: Record<string, CatalogTour> = {};
  for (const tour of getTours()) {
    catalog[tour.id] = {
      title: tour.data.title[lang],
      url: tourUrl(tour, lang),
      img: thumbSrc(tour.data.hero),
      variants: Object.fromEntries(
        tour.data.variants.map((v) => [
          v.id,
          {
            label: `${v.group ? `${v.group[lang]} · ` : ''}${v.label[lang]}`,
            adult: v.adult,
            child: v.child,
            adultLabel: v.adultLabel?.[lang] ?? t('common.adult'),
            childLabel: v.childLabel?.[lang] ?? t('common.child'),
          },
        ]),
      ),
    };
  }

  const config: CartConfig = {
    lang,
    lineId: LINE_ID,
    waNumber: WHATSAPP_NUMBER,
    email: EMAIL,
    browseUrl: catalogUrl(lang),
    ui: uiSubset(lang, [
      'cart.empty',
      'cart.browse',
      'cart.remove',
      'cart.summary',
      'cart.grandTotal',
      'cart.checkoutLine',
      'cart.checkoutWa',
      'cart.checkoutMail',
      'cart.note',
      'cart.sent',
      'cart.clear',
      'cart.or',
      'cart.deposit',
      'cart.payDeposit',
      'cart.payNote',
      'cart.payError',
      'common.date',
      'msg.heading',
      'msg.program',
      'msg.date',
      'msg.adults',
      'msg.children',
      'msg.subtotal',
      'msg.total',
      'msg.name',
      'msg.hotel',
      'msg.footer',
      'msg.noDate',
    ]),
  };

  return (
    <SiteShell lang={lang} alternates={cartAlternates()}>
      <header className="page-hero">
        <div className="page-hero__inner">
          <Breadcrumbs
            items={[{ label: t('nav.home'), href: homeUrl(lang) }, { label: t('cart.title') }]}
          />
          <h1 className="sec-title">{t('cart.title')}</h1>
        </div>
      </header>

      <section className="sec cartpg">
        <div className="container">
          <CartPageClient catalog={catalog} config={config} />
        </div>
      </section>
    </SiteShell>
  );
}
