import type { CSSProperties } from 'react';
import type { Lang } from '@/lib/i18n';
import { heroSrc } from '@/lib/images';

interface Props {
  lang: Lang;
}

export default function Stats({ lang }: Props) {
  const title = {
    th: 'ความไว้วางใจจากนักเดินทางทั่วโลก',
    en: 'Trusted by Travellers Worldwide',
    ru: 'Нам доверяют путешественники по всему миру',
  }[lang];

  const stats = [
    {
      cls: 'reveal rd1',
      num: '10+',
      lbl: {
        th: 'ปีแห่งประสบการณ์',
        en: 'Years of Experience',
        ru: 'лет опыта',
      },
    },
    {
      cls: 'reveal rd2',
      num: '5,000+',
      lbl: {
        th: 'นักเดินทางพึงพอใจ',
        en: 'Happy Travellers',
        ru: 'довольных путешественников',
      },
    },
    {
      cls: 'reveal rd3',
      num: '4.9',
      lbl: {
        th: 'คะแนนเฉลี่ยจากลูกค้า',
        en: 'Average Rating',
        ru: 'средняя оценка',
      },
    },
    {
      cls: 'reveal rd4',
      num: '25+',
      lbl: {
        th: 'จุดหมายสุดพิเศษ',
        en: 'Unique Destinations',
        ru: 'уникальных направлений',
      },
    },
  ];

  return (
    <section
      className="stats"
      style={{ '--stats-bg': `url(${heroSrc('stats_bg.jpg')})` } as CSSProperties}
    >
      <div className="stats__bg"></div>
      <div className="stats__veil"></div>
      <div className="stats__inner">
        <h2 className="stats__ttl reveal">{title}</h2>
        <div className="stats__grid">
          {stats.map((s) => (
            <div key={s.num} className={s.cls}>
              <span className="stat__num">{s.num}</span>
              <span className="stat__lbl">{s.lbl[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
