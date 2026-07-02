import CategoryChips from '../CategoryChips';
import Icon from '../Icon';
import TourCard from '../TourCard';
import { getTours } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { catalogUrl } from '@/lib/routes';

interface Props {
  lang: Lang;
}

export default function FeaturedTours({ lang }: Props) {
  const t = useT(lang);
  const tours = getTours().filter((tr) => tr.data.featured);

  const label = {
    th: 'โปรแกรมทัวร์',
    en: 'Tour Programs',
    ru: 'Туры',
  }[lang];
  const title = {
    th: 'เส้นทางสู่ความประทับใจ',
    en: 'Journeys to Remember',
    ru: 'Путешествия, которые запомнятся',
  }[lang];
  const desc = {
    th: 'คัดสรรโปรแกรมทัวร์หรูหราที่ออกแบบมาเพื่อสร้างความประทับใจที่คงอยู่ตลอดไป',
    en: 'Curated luxury tour programs designed to create memories that last a lifetime.',
    ru: 'Тщательно подобранные люксовые туры, созданные ради воспоминаний на всю жизнь.',
  }[lang];

  return (
    <section className="sec tours" id="tours">
      <div className="container">
        <div className="center-text reveal" style={{ marginBottom: '3rem' }}>
          <div className="sec-label center">
            <span>{label}</span>
          </div>
          <h2 className="sec-title">{title}</h2>
          <p className="sec-desc">{desc}</p>
        </div>
        <div style={{ marginBottom: '2.25rem' }}>
          <CategoryChips lang={lang} active="" onLight />
        </div>
        <div className="pgrid">
          {tours.map((tr) => (
            <TourCard key={tr.id} tour={tr} lang={lang} />
          ))}
        </div>
        <div className="center-text" style={{ marginTop: '2.75rem' }}>
          <a className="btn-navy" href={catalogUrl(lang)}>
            {t('common.viewAllTours')}
            <Icon name="arrow-right" size={15} />
          </a>
        </div>
      </div>
      <div id="land"></div>
    </section>
  );
}
