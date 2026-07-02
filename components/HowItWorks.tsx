import { t, type L, type Lang } from '@/lib/i18n';

interface Props {
  lang: Lang;
}

const label: L = { th: 'ขั้นตอนการจอง', en: 'How It Works', ru: 'Как это работает' };
const title: L = {
  th: 'เริ่มต้นการเดินทางง่ายๆ ใน 4 ขั้นตอน',
  en: 'Start Your Journey in 4 Simple Steps',
  ru: 'Начните путешествие за 4 простых шага',
};

const steps: { cls: string; title: L; desc: L }[] = [
  {
    cls: 'step reveal',
    title: { th: 'เลือกโปรแกรมที่ใช่', en: 'Choose Your Program', ru: 'Выберите программу' },
    desc: {
      th: 'เลือกจากโปรแกรมทัวร์ที่คัดสรรแล้ว หรือแจ้งความต้องการพิเศษกับทีมงานของเรา',
      en: "Browse our curated programs or tell us your dream trip and we'll design it just for you.",
      ru: 'Выберите из готовых программ или расскажите о путешествии мечты — мы создадим его для вас.',
    },
  },
  {
    cls: 'step reveal rd1',
    title: { th: 'ปรับแต่งตามใจคุณ', en: 'Customize Your Itinerary', ru: 'Настройте маршрут' },
    desc: {
      th: 'ทีมงานจะช่วยปรับแต่งทุกรายละเอียด ตั้งแต่เส้นทาง อาหาร ไปจนถึงกิจกรรมเสริม',
      en: "We'll tailor every detail — route, dining preferences, and add-on activities — to your wishes.",
      ru: 'Мы подстроим каждую деталь — маршрут, питание и дополнительные активности — под ваши пожелания.',
    },
  },
  {
    cls: 'step reveal rd2',
    title: {
      th: 'ส่งคำจองผ่าน LINE/WhatsApp',
      en: 'Send Your Booking via LINE/WhatsApp',
      ru: 'Отправьте заявку в LINE/WhatsApp',
    },
    desc: {
      th: 'กดส่งคำจองจากตะกร้า ระบบเปิดแชทพร้อมสรุปรายการให้อัตโนมัติ ทีมงานยืนยันที่ว่างและราคาก่อน ไม่ต้องชำระเงินล่วงหน้า',
      en: 'Send your booking from the cart — a chat opens with your order summary. We confirm availability and price first; no upfront payment.',
      ru: 'Отправьте заявку из корзины — откроется чат с готовой сводкой заказа. Мы сначала подтвердим наличие и цену; без предоплаты.',
    },
  },
  {
    cls: 'step reveal rd3',
    title: { th: 'เพลิดเพลินกับสวรรค์', en: 'Enjoy Paradise', ru: 'Наслаждайтесь раем' },
    desc: {
      th: 'ทีมงานรับท่านถึงโรงแรม พร้อมดูแลตลอดการเดินทาง ให้คุณเพลิดเพลินได้เต็มที่',
      en: 'We pick you up from your hotel and take care of everything — just sit back and enjoy.',
      ru: 'Мы заберём вас из отеля и позаботимся обо всём — просто расслабьтесь и наслаждайтесь.',
    },
  },
];

export default function HowItWorks({ lang }: Props) {
  return (
    <section className="sec how" id="how">
      <div className="container">
        <div className="center-text reveal" style={{ marginBottom: '3rem' }}>
          <div className="sec-label center">
            <span>{t(label, lang)}</span>
          </div>
          <h2 className="sec-title">{t(title, lang)}</h2>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <div className={step.cls} key={step.title.en}>
              <div className="step__n">{i + 1}</div>
              <div className="step__body">
                <h4>{t(step.title, lang)}</h4>
                <p>{t(step.desc, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
