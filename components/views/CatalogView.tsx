import Breadcrumbs from '../Breadcrumbs';
import CategoryChips from '../CategoryChips';
import JsonLd from '../JsonLd';
import SiteShell from '../SiteShell';
import TourCard from '../TourCard';
import { getTours } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { abs, catalogAlternates, catalogUrl, homeUrl, tourUrl } from '@/lib/routes';
import { breadcrumbSchema, itemListSchema } from '@/lib/seo';

export const catalogHeading = (lang: Lang) =>
  ({ th: 'ทัวร์ภูเก็ตทั้งหมด', en: 'All Phuket Tours', ru: 'Все туры по Пхукету' })[lang];

export const catalogSeo = (lang: Lang) => ({
  title: {
    th: 'ทัวร์ภูเก็ตทั้งหมด 2026 ทะเล เกาะพีพี ดำน้ำ ผจญภัย ราคาดีที่สุด | Phuket Love Paradise',
    en: 'All Phuket Tours 2026 — Islands, Diving, Adventures at Best Prices',
    ru: 'Все туры по Пхукету 2026 — острова, дайвинг, приключения по лучшим ценам',
  }[lang],
  description: {
    th: 'รวมทัวร์ภูเก็ตทุกโปรแกรม เกาะพีพี เจมส์บอนด์ ดำน้ำ ATV ซิปไลน์ ช้าง ซิตี้ทัวร์ ราคาชัดเจน รวมรถรับส่ง จองผ่าน LINE ได้เลย',
    en: 'Every Phuket tour in one place — Phi Phi, James Bond, diving, ATV, zipline, elephants and city tours. Clear prices with hotel transfer, book via LINE.',
    ru: 'Все туры Пхукета — Пхи-Пхи, Джеймс Бонд, дайвинг, ATV, зиплайн, слоны и сити-туры. Честные цены с трансфером, бронирование через LINE.',
  }[lang],
});

export default function CatalogView({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const tours = getTours();
  const heading = catalogHeading(lang);
  const intro = {
    th: 'เลือกทริปที่ใช่จากทัวร์ทั้งหมดของเรา — ทะเล เกาะ ดำน้ำ ผจญภัยบนบก และแพ็คเกจคอมโบ จองง่าย ยืนยันผ่าน LINE ไม่ต้องจ่ายก่อน',
    en: 'Pick your perfect trip from our full range — sea and island tours, diving, land adventures and combo packages. Easy booking, confirmed via LINE, no upfront payment.',
    ru: 'Выберите идеальный тур — море и острова, дайвинг, наземные приключения и комбо-пакеты. Простое бронирование через LINE без предоплаты.',
  }[lang];

  const jsonLd = [
    breadcrumbSchema([
      { name: t('nav.home'), url: abs(homeUrl(lang)) },
      { name: heading, url: abs(catalogUrl(lang)) },
    ]),
    itemListSchema(tours.map((tour) => ({ name: tour.data.title[lang], url: abs(tourUrl(tour, lang)) }))),
  ];

  return (
    <SiteShell lang={lang} alternates={catalogAlternates()}>
      <JsonLd schemas={jsonLd} />
      <header className="page-hero">
        <div className="page-hero__inner">
          <Breadcrumbs items={[{ label: t('nav.home'), href: homeUrl(lang) }, { label: heading }]} />
          <h1 className="sec-title">{heading}</h1>
          <p className="sec-desc">{intro}</p>
          <CategoryChips lang={lang} active="all" />
        </div>
      </header>
      <section className="sec tours">
        <div className="container">
          <div className="pgrid">
            {tours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} lang={lang} loading={i < 3 ? 'eager' : 'lazy'} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
