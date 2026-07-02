import type { CSSProperties } from 'react';
import Icon from '../Icon';
import type { Lang } from '@/lib/i18n';
import { heroSrc } from '@/lib/images';
import { catalogUrl } from '@/lib/routes';

interface Props {
  lang: Lang;
}

export default function Hero({ lang }: Props) {
  const badge = {
    th: 'ภูเก็ต · ทะเลอันดามัน',
    en: 'Phuket · Andaman Sea',
    ru: 'Пхукет · Андаманское море',
  }[lang];
  const titleA = {
    th: 'ดำดิ่งสู่สวรรค์',
    en: 'Immerse Yourself',
    ru: 'Погрузитесь',
  }[lang];
  const titleB = {
    th: 'แห่งทะเลอันดามัน',
    en: 'in Andaman Paradise',
    ru: 'в рай Андаманского моря',
  }[lang];
  const sub = {
    th: 'ออกแบบประสบการณ์ท่องเที่ยวสุดหรูในภูเก็ต ด้วยทีมงานมืออาชีพที่ดูแลทุกรายละเอียด เพื่อให้การเดินทางของคุณสมบูรณ์แบบที่สุด',
    en: 'Bespoke luxury travel experiences in Phuket, crafted by expert local guides dedicated to making every moment of your journey truly unforgettable.',
    ru: 'Эксклюзивные люксовые путешествия по Пхукету, созданные опытными местными гидами, чтобы каждое мгновение вашего отдыха стало по-настоящему незабываемым.',
  }[lang];
  const ctaBook = {
    th: 'จองทัวร์ตอนนี้',
    en: 'Book Your Tour',
    ru: 'Забронировать тур',
  }[lang];
  const ctaExplore = {
    th: 'ดูโปรแกรมทัวร์',
    en: 'Explore Tours',
    ru: 'Смотреть туры',
  }[lang];

  return (
    <section
      className="hero"
      style={{ '--hero-bg': `url(${heroSrc('view_3.jpg')})` } as CSSProperties}
    >
      <div className="hero__bg"></div>
      <div className="hero__veil"></div>
      <div className="hero__content">
        <div className="hero__badge">
          <Icon name="anchor" size={13} />
          <span>{badge}</span>
        </div>
        <h1 className="hero__title">
          <span>{titleA}</span>
          <br />
          <span className="gold">{titleB}</span>
        </h1>
        <p className="hero__sub">{sub}</p>
        <div className="hero__btns">
          <a href={catalogUrl(lang)} className="btn-gold">
            <Icon name="calendar-check" size={16} />
            <span>{ctaBook}</span>
          </a>
          <a href="#tours" className="btn-ghost">
            <span>{ctaExplore}</span>
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <Icon name="chevrons-down" size={18} />
      </div>
    </section>
  );
}
