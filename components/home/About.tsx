import Icon from '../Icon';
import WaveSep from '../WaveSep';
import type { Lang } from '@/lib/i18n';
import { cardSrc } from '@/lib/images';

interface Props {
  lang: Lang;
}

export default function About({ lang }: Props) {
  const label = {
    th: 'เกี่ยวกับเรา',
    en: 'About Us',
    ru: 'О нас',
  }[lang];
  const title = {
    th: 'ความหรูหราคือหัวใจของทุกการเดินทาง',
    en: 'Luxury Is the Heart of Every Journey',
    ru: 'Роскошь — в сердце каждого путешествия',
  }[lang];
  const desc = {
    th: 'ภูเก็ตเลิฟพาราไดซ์ก่อตั้งขึ้นด้วยความตั้งใจให้นักเดินทางได้สัมผัสภูเก็ตในแบบที่แตกต่าง เราคัดสรรเส้นทาง จัดทีมไกด์ผู้เชี่ยวชาญ และออกแบบประสบการณ์ส่วนตัวที่ตอบโจทย์ทุกความต้องการ',
    en: 'Founded with a passion for extraordinary travel, Phuket Love Paradise crafts personalized itineraries beyond ordinary tours — expert guides, private charters, and impeccable attention to every detail.',
    ru: 'Phuket Love Paradise создан из любви к необыкновенным путешествиям. Мы составляем индивидуальные маршруты, выходящие за рамки обычных туров — опытные гиды, частные яхты и безупречное внимание к каждой детали.',
  }[lang];
  const badgeYears = {
    th: 'ปีแห่งประสบการณ์',
    en: 'Years Exp.',
    ru: 'лет опыта',
  }[lang];

  const feats = [
    {
      icon: 'users',
      cls: 'about__feat reveal rd1',
      title: {
        th: 'ทีมไกด์ผู้เชี่ยวชาญ',
        en: 'Expert Local Guides',
        ru: 'Опытные местные гиды',
      },
      text: {
        th: 'ไกด์ท้องถิ่นที่รู้จักภูเก็ตดีที่สุด พร้อมดูแลคุณตลอดการเดินทาง',
        en: 'Local guides with deep knowledge of Phuket, ensuring a seamless and enriching experience.',
        ru: 'Местные гиды с глубоким знанием Пхукета обеспечивают комфортное и насыщенное путешествие.',
      },
    },
    {
      icon: 'ship',
      cls: 'about__feat reveal rd2',
      title: {
        th: 'เรือยอชต์ส่วนตัว',
        en: 'Private Yacht Charters',
        ru: 'Аренда частных яхт',
      },
      text: {
        th: 'เรือยอชต์หรูพร้อมลูกเรือมืออาชีพ สำหรับประสบการณ์บนทะเลสุดเอ็กซ์คลูซีฟ',
        en: 'Luxury yachts with professional crew for a truly exclusive Andaman Sea experience.',
        ru: 'Роскошные яхты с профессиональным экипажем для по-настоящему эксклюзивного отдыха в Андаманском море.',
      },
    },
    {
      icon: 'shield-check',
      cls: 'about__feat reveal rd3',
      title: {
        th: 'ความปลอดภัยสูงสุด',
        en: 'Safety First, Always',
        ru: 'Безопасность прежде всего',
      },
      text: {
        th: 'มาตรฐานความปลอดภัยระดับสากล ประกันการเดินทางครอบคลุมทุกกิจกรรม',
        en: 'International safety standards and comprehensive travel insurance covering all activities.',
        ru: 'Международные стандарты безопасности и полная туристическая страховка на все виды активности.',
      },
    },
    {
      icon: 'gem',
      cls: 'about__feat reveal rd4',
      title: {
        th: 'บริการส่วนตัวพิเศษ',
        en: 'Personalized Service',
        ru: 'Индивидуальный сервис',
      },
      text: {
        th: 'ปรับแต่งทุกรายละเอียดตามความต้องการ ตั้งแต่อาหาร ที่พัก จนถึงเส้นทาง',
        en: 'Every detail — dining preferences, accommodation, and route — tailored specifically for you.',
        ru: 'Каждая деталь — питание, проживание и маршрут — подобрана специально для вас.',
      },
    },
  ];

  return (
    <>
      <section className="sec about" id="about">
        <div className="container">
          <div className="about__inner">
            <div className="about__text reveal">
              <div className="sec-label">
                <Icon name="sparkles" size={14} />
                <span>{label}</span>
              </div>
              <h2 className="sec-title lt">{title}</h2>
              <p className="sec-desc lt">{desc}</p>
              <div className="about__feats">
                {feats.map((f) => (
                  <div key={f.icon} className={f.cls}>
                    <div className="about__feat-ic">
                      <Icon name={f.icon} size={18} />
                    </div>
                    <div>
                      <h4>{f.title[lang]}</h4>
                      <p>{f.text[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about__imgs reveal-right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about__img-a"
                src={cardSrc('view_4.jpg')}
                alt="อ่าวมาหยา เกาะพีพีเล"
                width={640}
                height={760}
                loading="eager"
                fetchPriority="high"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about__img-b"
                src={cardSrc('diving_8.jpg')}
                alt="ดำน้ำกับเต่าทะเลในอันดามัน"
                width={480}
                height={500}
              />
              <div className="about__badge">
                <span>10+</span>
                <small>{badgeYears}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* wave about(navy)→tours(ivory) */}
      <WaveSep bg="var(--navy)" fill="#faf6ee" shape="dip" />
    </>
  );
}
