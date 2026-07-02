import ContactChannels from '../ContactChannels';
import GoodToKnow from '../GoodToKnow';
import HowItWorks from '../HowItWorks';
import SiteShell from '../SiteShell';
import WaveSep from '../WaveSep';
import { t, type L, type Lang } from '@/lib/i18n';
import { howToBookAlternates } from '@/lib/routes';

const seoTitle: L = {
  th: 'วิธีจองทัวร์ภูเก็ต จองผ่าน LINE/WhatsApp ไม่ต้องจ่ายเงินก่อน | Phuket Love Paradise',
  en: 'How to Book Phuket Tours — via LINE or WhatsApp, No Upfront Payment | Phuket Love Paradise',
  ru: 'Как забронировать туры на Пхукете — через LINE или WhatsApp, без предоплаты | Phuket Love Paradise',
};
const seoDesc: L = {
  th: 'วิธีจองทัวร์ภูเก็ตกับ Phuket Love Paradise ง่ายๆ ใน 4 ขั้นตอน เลือกทัวร์ ใส่ตะกร้า ส่งคำจองผ่าน LINE หรือ WhatsApp ทีมงานยืนยันที่ว่างและราคาก่อน ไม่ต้องจ่ายเงินล่วงหน้า พร้อมข้อมูลเวลารับ สิ่งที่ต้องเตรียม และช่องทางติดต่อครบ',
  en: 'Book Phuket tours with Phuket Love Paradise in 4 easy steps: pick your tours, add them to the cart and send your booking via LINE or WhatsApp — our team confirms availability first, with no upfront payment. Plus pickup times, packing tips and every contact channel.',
  ru: 'Забронируйте туры на Пхукете с Phuket Love Paradise за 4 шага: выберите туры, добавьте в корзину и отправьте заявку в LINE или WhatsApp — команда сначала подтвердит наличие мест, без предоплаты. Плюс время трансфера, советы и все каналы связи.',
};

const heroLabel: L = { th: 'วิธีจอง', en: 'How to Book', ru: 'Как забронировать' };
const heroTitle: L = {
  th: 'จองง่ายใน 4 ขั้นตอน',
  en: 'Book in 4 Easy Steps',
  ru: 'Бронирование за 4 шага',
};
const heroDesc: L = {
  th: 'เลือกทัวร์ที่ถูกใจ ใส่ตะกร้า แล้วส่งคำจองผ่าน LINE หรือ WhatsApp — ทีมงานจะยืนยันที่ว่างและราคาให้ก่อน โดยไม่ต้องจ่ายเงินล่วงหน้า',
  en: 'Pick the tours you love, add them to your cart and send the booking via LINE or WhatsApp — our team confirms availability and price first, with no upfront payment.',
  ru: 'Выберите туры, добавьте их в корзину и отправьте заявку в LINE или WhatsApp — наша команда сначала подтвердит наличие мест и цену, без предоплаты.',
};

export const howToBookSeo = (lang: Lang) => ({
  title: t(seoTitle, lang),
  description: t(seoDesc, lang),
});

export default function HowToBookView({ lang }: { lang: Lang }) {
  return (
    <SiteShell lang={lang} alternates={howToBookAlternates()}>
      <header className="page-hero">
        <div className="page-hero__inner">
          <div className="sec-label">
            <span>{t(heroLabel, lang)}</span>
          </div>
          <h1 className="sec-title">{t(heroTitle, lang)}</h1>
          <p className="sec-desc">{t(heroDesc, lang)}</p>
        </div>
      </header>

      <WaveSep bg="var(--navy)" fill="var(--ivory)" shape="dip" />

      <HowItWorks lang={lang} />

      <WaveSep bg="var(--ivory)" fill="var(--navy)" shape="rise" />

      <GoodToKnow lang={lang} />

      <ContactChannels lang={lang} />
    </SiteShell>
  );
}
