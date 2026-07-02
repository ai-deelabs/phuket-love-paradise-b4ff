import Icon from './Icon';
import { t, type L, type Lang } from '@/lib/i18n';
import { thumbSrc } from '@/lib/images';
import {
  EMAIL,
  FACEBOOK_URL,
  HOURS,
  LINE_ADD_URL,
  LINE_ID,
  PHONE,
  PHONE_DISPLAY,
  SITE_NAME,
  WHATSAPP_NUMBER,
} from '@/lib/site';

interface Props {
  lang: Lang;
}

const label: L = { th: 'ติดต่อเรา', en: 'Get in Touch', ru: 'Связаться с нами' };
const title: L = {
  th: 'พร้อมช่วยวางแผนทริปในฝันของคุณ',
  en: 'Ready to Plan Your Dream Trip',
  ru: 'Готовы спланировать поездку вашей мечты',
};
const desc: L = {
  th: 'เลือกช่องทางที่สะดวกสำหรับคุณ ทีมงานของเราพร้อมตอบทุกคำถามและช่วยจองทัวร์ให้คุณ',
  en: 'Reach us through whichever channel suits you best — our team is ready to answer your questions and book your tour.',
  ru: 'Свяжитесь с нами удобным способом — наша команда ответит на вопросы и забронирует тур.',
};
const consultantRole: L = {
  th: 'ที่ปรึกษาการเดินทางส่วนตัวของคุณ',
  en: 'Your personal travel consultant',
  ru: 'Ваш персональный консультант',
};

const phoneTitle: L = { th: 'โทรศัพท์', en: 'Phone', ru: 'Телефон' };
const emailTitle: L = { th: 'อีเมล', en: 'Email', ru: 'Эл. почта' };
const locationTitle: L = {
  th: 'ที่ตั้ง · เวลาทำการ',
  en: 'Location · Hours',
  ru: 'Адрес · Часы',
};
const locationLine: L = {
  th: `ภูเก็ต ประเทศไทย · ทุกวัน ${HOURS} น.`,
  en: `Phuket, Thailand · Daily ${HOURS}`,
  ru: `Пхукет, Таиланд · Ежедневно ${HOURS}`,
};

export default function ContactChannels({ lang }: Props) {
  return (
    <section className="sec contact" id="contact">
      <div className="container contact__inner">
        <div className="contact__lead reveal">
          <div className="sec-label">
            <Icon name="message-circle" size={14} />
            <span>{t(label, lang)}</span>
          </div>
          <h2 className="sec-title lt">{t(title, lang)}</h2>
          <p className="sec-desc lt">{t(desc, lang)}</p>
          <div className="contact__person">
            <img src={thumbSrc('avatar_nira.jpg')} alt={t(consultantRole, lang)} width={44} height={44} />
            <span>
              <strong>คุณนิรา จันทรวงศ์ · Nira Chandrawong</strong>
              <span>{t(consultantRole, lang)}</span>
            </span>
          </div>
        </div>

        <div className="contact__grid">
          <a className="ccard reveal" href={`tel:${PHONE}`}>
            <div className="ccard__ic phone">
              <Icon name="phone" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>{t(phoneTitle, lang)}</h4>
              <p>{PHONE_DISPLAY}</p>
            </div>
          </a>
          <a className="ccard reveal rd1" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener">
            <div className="ccard__ic wa">
              <Icon name="message-circle" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>WhatsApp</h4>
              <p>{PHONE_DISPLAY}</p>
            </div>
          </a>
          <a className="ccard reveal rd2" href={LINE_ADD_URL} target="_blank" rel="noopener">
            <div className="ccard__ic line">
              <Icon name="message-square" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>LINE</h4>
              <p>{LINE_ID}</p>
            </div>
          </a>
          <a className="ccard reveal" href={FACEBOOK_URL} target="_blank" rel="noopener">
            <div className="ccard__ic fb">
              <Icon name="facebook" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>Facebook</h4>
              <p>{SITE_NAME}</p>
            </div>
          </a>
          <a className="ccard reveal rd1" href={`mailto:${EMAIL}`}>
            <div className="ccard__ic mail">
              <Icon name="mail" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>{t(emailTitle, lang)}</h4>
              <p>{EMAIL}</p>
            </div>
          </a>
          <div className="ccard reveal rd2">
            <div className="ccard__ic map">
              <Icon name="map-pin" size={22} />
            </div>
            <div className="ccard__tx">
              <h4>{t(locationTitle, lang)}</h4>
              <p>{t(locationLine, lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
