import Icon from '../Icon';
import type { Lang } from '@/lib/i18n';
import { thumbSrc } from '@/lib/images';

interface Props {
  lang: Lang;
}

export default function Testimonials({ lang }: Props) {
  const label = {
    th: 'รีวิวจากลูกค้า',
    en: 'Guest Reviews',
    ru: 'Отзывы гостей',
  }[lang];
  const title = {
    th: 'เสียงจากนักเดินทางของเรา',
    en: 'Words from Our Travellers',
    ru: 'Слова наших путешественников',
  }[lang];

  const reviews = [
    {
      cls: 'testi-card reveal',
      txt: {
        th: '"ประสบการณ์ที่ดีที่สุดในชีวิต ทีมงานดูแลทุกอย่างอย่างเป็นมืออาชีพ ตั้งแต่รับจากโรงแรมจนถึงส่งกลับ ไม่มีอะไรให้ต้องกังวลเลย แนะนำ 100%"',
        en: '"The best experience of our lives. Every detail was handled flawlessly — from hotel pickup to sunset drop-off. We didn\'t have to worry about a single thing. 100% recommended."',
        ru: '"Лучшее впечатление в нашей жизни. Всё было организовано безупречно — от трансфера из отеля до проводов на закате. Нам не о чем было беспокоиться. Рекомендуем на 100%."',
      },
      avatar: 'avatar_nira.jpg',
      alt: 'นลิน วงศ์สุวรรณ',
      name: 'นลิน วงศ์สุวรรณ',
      origin: {
        th: 'กรุงเทพฯ, ประเทศไทย',
        en: 'Bangkok, Thailand',
        ru: 'Бангкок, Таиланд',
      },
    },
    {
      cls: 'testi-card reveal rd1',
      txt: {
        th: '"โปรแกรม Sunset Yacht Cruise สุดยอดมาก อาหารอร่อยมาก วิวสวยงาม ทีมงานเป็นกันเองและมืออาชีพมาก จะกลับมาอีกแน่นอน"',
        en: '"The Sunset Yacht Cruise was absolutely spectacular. The food, the views, the crew — everything was perfect. We\'ve already booked our return trip with Phuket Love Paradise."',
        ru: '"Круиз на яхте на закате был просто потрясающим. Еда, виды, экипаж — всё было идеально. Мы уже забронировали повторную поездку с Phuket Love Paradise."',
      },
      avatar: 'avatar_sarah.jpg',
      alt: 'Sarah Thompson',
      name: 'Sarah & James Thompson',
      origin: {
        th: 'ลอนดอน, สหราชอาณาจักร',
        en: 'London, United Kingdom',
        ru: 'Лондон, Великобритания',
      },
    },
    {
      cls: 'testi-card reveal rd2',
      txt: {
        th: '"พาครอบครัวมาเที่ยว ทีมงานดูแลทั้งผู้ใหญ่และเด็กได้ดีมาก ไกด์พูดภาษาไทยและอังกฤษได้คล่อง ทุกคนประทับใจมาก ขอบคุณมากครับ"',
        en: '"Brought the whole family and the guides were brilliant with everyone — adults and children alike. Fluent Thai and English, endlessly patient, and genuinely knowledgeable. Truly remarkable."',
        ru: '"Приехали всей семьёй, и гиды были великолепны со всеми — и со взрослыми, и с детьми. Свободный тайский и английский, бесконечное терпение и настоящие знания. Поистине замечательно."',
      },
      avatar: 'avatar_wipada.jpg',
      alt: 'วิภาดา ศรีสุข',
      name: 'วิภาดา ศรีสุข',
      origin: {
        th: 'เชียงใหม่, ประเทศไทย',
        en: 'Chiang Mai, Thailand',
        ru: 'Чиангмай, Таиланд',
      },
    },
  ];

  return (
    <section className="sec testi" id="testimonials">
      <div className="container">
        <div className="center-text reveal" style={{ marginBottom: '2.75rem' }}>
          <div className="sec-label center">
            <span>{label}</span>
          </div>
          <h2 className="sec-title lt">{title}</h2>
        </div>
        <div className="testi__grid">
          {reviews.map((r) => (
            <div key={r.avatar} className={r.cls}>
              <div className="testi-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={15} />
                ))}
              </div>
              <p className="testi-txt">{r.txt[lang]}</p>
              <div className="testi-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="testi-avatar"
                  src={thumbSrc(r.avatar)}
                  alt={r.alt}
                  width={92}
                  height={92}
                  loading="lazy"
                />
                <div>
                  <strong className="testi-name">{r.name}</strong>
                  <span className="testi-origin">{r.origin[lang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
