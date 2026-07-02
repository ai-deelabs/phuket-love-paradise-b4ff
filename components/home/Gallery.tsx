import type { Lang } from '@/lib/i18n';
import { cardSrc } from '@/lib/images';

interface Props {
  lang: Lang;
}

export default function Gallery({ lang }: Props) {
  const label = {
    th: 'แกลเลอรีภาพ',
    en: 'Photo Gallery',
    ru: 'Фотогалерея',
  }[lang];
  const title = {
    th: 'ความงามที่รอให้คุณค้นพบ',
    en: 'Beauty Waiting to Be Discovered',
    ru: 'Красота, которую стоит открыть',
  }[lang];

  const items = [
    { cls: 'gal-item reveal', img: 'view_3.jpg', alt: 'ปีเลห์ลากูน เกาะพีพี', w: 1000, h: 520 },
    { cls: 'gal-item reveal rd1', img: 'view_4.jpg', alt: 'อ่าวมาหยา', w: 600, h: 420 },
    { cls: 'gal-item reveal rd2', img: 'view_1.jpg', alt: 'เจ็ตสกีบนชายหาด', w: 600, h: 420 },
    {
      cls: 'gal-item reveal rd1',
      img: 'diving_4.jpg',
      alt: 'ดำน้ำลึกชมเรือจมและฝูงปลา',
      w: 1000,
      h: 520,
    },
    { cls: 'gal-item reveal rd2', img: 'diving_8.jpg', alt: 'ดำน้ำกับเต่าทะเล', w: 600, h: 420 },
  ];

  return (
    <section className="sec gallery" id="gallery">
      <div className="container">
        <div className="center-text reveal" style={{ marginBottom: '2.25rem' }}>
          <div className="sec-label center">
            <span>{label}</span>
          </div>
          <h2 className="sec-title">{title}</h2>
        </div>
        <div className="gallery__grid">
          {items.map((it) => (
            <div key={it.img} className={it.cls}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cardSrc(it.img)} alt={it.alt} width={it.w} height={it.h} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
