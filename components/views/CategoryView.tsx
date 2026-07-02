import Breadcrumbs from '../Breadcrumbs';
import CategoryChips from '../CategoryChips';
import Icon from '../Icon';
import JsonLd from '../JsonLd';
import SiteShell from '../SiteShell';
import TourCard from '../TourCard';
import { toursInCategory, type Category } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import {
  abs,
  catalogUrl,
  categoryAlternates,
  categoryUrl,
  homeUrl,
  howToBookUrl,
  tourUrl,
} from '@/lib/routes';
import { breadcrumbSchema, itemListSchema } from '@/lib/seo';

interface Props {
  lang: Lang;
  category: Category;
}

export default function CategoryView({ lang, category }: Props) {
  const t = useT(lang);
  const d = category.data;
  const tours = toursInCategory(category.id);

  const jsonLd = [
    breadcrumbSchema([
      { name: t('nav.home'), url: abs(homeUrl(lang)) },
      { name: t('nav.tours'), url: abs(catalogUrl(lang)) },
      { name: d.title[lang], url: abs(categoryUrl(category, lang)) },
    ]),
    itemListSchema(tours.map((tour) => ({ name: tour.data.title[lang], url: abs(tourUrl(tour, lang)) }))),
  ];

  const isPackages = category.id === 'packages';
  const ctaTitle = {
    th: 'อยากได้แพ็คเกจหลายวันแบบจัดเอง?',
    en: 'Want a custom multi-day package?',
    ru: 'Нужен индивидуальный многодневный пакет?',
  }[lang];
  const ctaText = {
    th: 'บอกจำนวนวัน งบประมาณ และสิ่งที่อยากทำ ทีมงานจะจัดโปรแกรมพร้อมราคาให้ฟรี ไม่มีข้อผูกมัด',
    en: 'Tell us your days, budget and wishlist — our team will craft an itinerary with prices for free, no obligation.',
    ru: 'Расскажите о датах, бюджете и пожеланиях — мы бесплатно составим программу с ценами, без обязательств.',
  }[lang];

  return (
    <SiteShell lang={lang} alternates={categoryAlternates(category)}>
      <JsonLd schemas={jsonLd} />
      <header className="page-hero">
        <div className="page-hero__inner">
          <Breadcrumbs
            items={[
              { label: t('nav.home'), href: homeUrl(lang) },
              { label: t('nav.tours'), href: catalogUrl(lang) },
              { label: d.title[lang] },
            ]}
          />
          <h1 className="sec-title">{d.title[lang]}</h1>
          <p className="sec-desc">{d.description[lang]}</p>
          <CategoryChips lang={lang} active={category.id} />
        </div>
      </header>
      <section className="sec tours">
        <div className="container">
          <div className="pgrid">
            {tours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} lang={lang} loading={i < 3 ? 'eager' : 'lazy'} />
            ))}
            {isPackages && (
              <article className="pcard pcard--cta">
                <Icon name="messages-square" size={34} />
                <h3>{ctaTitle}</h3>
                <p>{ctaText}</p>
                <a className="btn-gold" href={howToBookUrl(lang)}>
                  {t('nav.contact')}
                  <Icon name="arrow-right" size={15} />
                </a>
              </article>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
