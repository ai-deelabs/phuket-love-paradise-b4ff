import Icon from '../Icon';
import type { Lang } from '@/lib/i18n';
import { cardSrc } from '@/lib/images';

interface Props {
  lang: Lang;
}

export default function Experiences({ lang }: Props) {
  const label = {
    th: 'ประสบการณ์พิเศษ',
    en: 'Exclusive Experiences',
    ru: 'Эксклюзивные впечатления',
  }[lang];
  const title = {
    th: 'สัมผัสสิ่งที่มากกว่าทัวร์ทั่วไป',
    en: 'More Than Just a Tour',
    ru: 'Больше, чем просто тур',
  }[lang];
  const desc = {
    th: 'เลือกกิจกรรมสุดพิเศษที่เพิ่มมิติใหม่ให้กับการเดินทางของคุณ',
    en: 'Add a new dimension to your journey with our exclusive curated activities.',
    ru: 'Добавьте новое измерение своему путешествию с нашими эксклюзивными активностями.',
  }[lang];

  // Legacy hotlinked images (cards 3–6) replaced with the closest local assets.
  const cards = [
    {
      img: 'view_2.jpg',
      alt: 'เรือทัวร์ส่วนตัว',
      icon: 'ship',
      ttl: {
        th: 'เช่าเรือยอชต์ส่วนตัว',
        en: 'Private Yacht Charter',
        ru: 'Аренда частной яхты',
      },
      txt: {
        th: 'เรือยอชต์หรูพร้อมลูกเรือ ออกแบบเส้นทางตามใจคุณ',
        en: 'Luxury yacht with full crew — chart your own course across the Andaman.',
        ru: 'Роскошная яхта с полным экипажем — проложите собственный маршрут по Андаманскому морю.',
      },
    },
    {
      img: 'diving_8.jpg',
      alt: 'ดำน้ำลึกกับเต่าทะเล',
      icon: 'waves',
      ttl: {
        th: 'สกูบาไดฟ์วิ่ง',
        en: 'Scuba Diving',
        ru: 'Дайвинг',
      },
      txt: {
        th: 'ดำน้ำลึกกับครูผู้เชี่ยวชาญ สัมผัสโลกใต้ทะเลที่ลึกกว่า',
        en: "Dive deep with certified instructors into Phuket's stunning underwater world.",
        ru: 'Погрузитесь с сертифицированными инструкторами в потрясающий подводный мир Пхукета.',
      },
    },
    {
      img: 'view_5.jpg',
      alt: 'พายคายัคในป่าโกงกาง',
      icon: 'map',
      ttl: {
        th: 'พายคายัคป่าโกงกาง',
        en: 'Mangrove Kayaking',
        ru: 'Каякинг по мангровым зарослям',
      },
      txt: {
        th: 'สำรวจระบบนิเวศป่าโกงกางอันเงียบสงบ ท่ามกลางธรรมชาติที่งดงาม',
        en: "Glide through serene mangrove forests and discover Phuket's hidden natural side.",
        ru: 'Скользите по тихим мангровым лесам и откройте скрытую природу Пхукета.',
      },
    },
    {
      img: 'view_6.jpg',
      alt: 'ล่องเรือชมพระอาทิตย์ขึ้น',
      icon: 'sunrise',
      ttl: {
        th: 'ทัวร์ชมพระอาทิตย์ขึ้น',
        en: 'Sunrise Boat Tour',
        ru: 'Лодочный тур на рассвете',
      },
      txt: {
        th: 'ตื่นเช้าออกเรือชมพระอาทิตย์ขึ้นเหนือทะเลอันดามัน ประสบการณ์ที่หาที่ไหนไม่ได้',
        en: 'Rise early and watch the Andaman sunrise from the deck — an experience like no other.',
        ru: 'Встаньте пораньше и встретьте рассвет над Андаманским морем с палубы — незабываемые впечатления.',
      },
    },
    {
      img: 'food_1.jpg',
      alt: 'เรียนทำอาหารไทย',
      icon: 'utensils',
      ttl: {
        th: 'เรียนทำอาหารไทย',
        en: 'Thai Cooking Class',
        ru: 'Кулинарный мастер-класс',
      },
      txt: {
        th: 'เรียนรู้ศิลปะการทำอาหารไทยแท้ กับเชฟท้องถิ่นผู้มากประสบการณ์',
        en: 'Master authentic Thai cuisine alongside experienced local chefs in a hands-on class.',
        ru: 'Освойте настоящую тайскую кухню вместе с опытными местными шеф-поварами.',
      },
    },
    {
      img: 'elephant_care.jpg',
      alt: 'เยี่ยมชมช้างไทย',
      icon: 'leaf',
      ttl: {
        th: 'เยี่ยมชมช้างไทย',
        en: 'Elephant Sanctuary Visit',
        ru: 'Посещение слоновьего заповедника',
      },
      txt: {
        th: 'ใกล้ชิดช้างไทยในสถานที่ดูแลที่มีจริยธรรม ไม่มีการขี่ช้าง',
        en: "A close and ethical encounter with Thailand's beloved elephants — no riding, just respect.",
        ru: 'Близкое и этичное знакомство с любимыми слонами Таиланда — без катания, только уважение.',
      },
    },
  ];

  return (
    <section className="sec exp" id="experiences">
      <div className="container">
        <div className="exp__hdr reveal" style={{ marginBottom: '2rem' }}>
          <div className="sec-label">
            <Icon name="star" size={14} />
            <span>{label}</span>
          </div>
          <h2 className="sec-title lt">{title}</h2>
          <p className="sec-desc lt">{desc}</p>
        </div>
        <div className="exp__scroll">
          {cards.map((c) => (
            <div key={c.img} className="exp-card">
              <div className="exp-card__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cardSrc(c.img)} alt={c.alt} width={500} height={320} loading="lazy" />
              </div>
              <div className="exp-card__body">
                <div className="exp-card__ic">
                  <Icon name={c.icon} size={18} />
                </div>
                <div className="exp-card__ttl">{c.ttl[lang]}</div>
                <div className="exp-card__txt">{c.txt[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
