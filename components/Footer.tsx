import Icon from './Icon';
import { getCategories, getTours } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { categoryUrl, howToBookUrl, tourUrl } from '@/lib/routes';
import { EMAIL, FACEBOOK_URL, LINE_ADD_URL, PHONE_DISPLAY } from '@/lib/site';

export default function Footer({ lang }: { lang: Lang }) {
  const t = useT(lang);
  const categories = getCategories();
  const featured = getTours().filter((tr) => tr.data.featured).slice(0, 4);

  const brandLine = {
    th: 'บริการทัวร์หรูหราในภูเก็ต ออกแบบประสบการณ์สุดพิเศษบนทะเลอันดามัน กับทีมงานมืออาชีพที่ใส่ใจในทุกรายละเอียด',
    en: 'Luxury tour specialists in Phuket, crafting extraordinary Andaman Sea experiences with an expert team dedicated to every detail.',
    ru: 'Специалисты по люксовым турам на Пхукете. Создаём незабываемые впечатления на Андаманском море с командой профессионалов, внимательной к каждой детали.',
  }[lang];
  const address = {
    th: 'ภูเก็ต, ประเทศไทย 83000',
    en: 'Phuket, Thailand 83000',
    ru: 'Пхукет, Таиланд 83000',
  }[lang];
  const hoursLine = {
    th: 'ทุกวัน 08:00–20:00 น.',
    en: 'Daily 08:00–20:00',
    ru: 'Ежедневно 08:00–20:00',
  }[lang];
  const copyright = {
    th: '© 2026 ภูเก็ตเลิฟพาราไดซ์ สงวนลิขสิทธิ์',
    en: '© 2026 Phuket Love Paradise. All rights reserved.',
    ru: '© 2026 Phuket Love Paradise. Все права защищены.',
  }[lang];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand-col">
            <div className="footer__brand-name">Phuket Love Paradise</div>
            <div className="footer__brand-sub">ภูเก็ตเลิฟพาราไดซ์</div>
            <p>{brandLine}</p>
            <div className="footer__socials">
              <a href={FACEBOOK_URL} className="footer__soc" aria-label="Facebook" rel="noopener" target="_blank">
                <Icon name="facebook" size={16} />
              </a>
              <a href={LINE_ADD_URL} className="footer__soc" aria-label="LINE" rel="noopener" target="_blank">
                <Icon name="message-circle" size={16} />
              </a>
              <a href={`mailto:${EMAIL}`} className="footer__soc" aria-label="Email">
                <Icon name="mail" size={16} />
              </a>
            </div>
          </div>
          <div className="footer__col">
            <h5>{t('nav.tours')}</h5>
            <ul className="footer__links">
              {featured.map((tr) => (
                <li key={tr.id}>
                  <a href={tourUrl(tr, lang)}>{tr.data.title[lang]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h5>{t('nav.categories')}</h5>
            <ul className="footer__links">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={categoryUrl(c, lang)}>{c.data.title[lang]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h5>{t('nav.contact')}</h5>
            <div className="footer__ci">
              <div className="footer__ci-item">
                <Icon name="phone" size={14} />
                <span>{PHONE_DISPLAY}</span>
              </div>
              <div className="footer__ci-item">
                <Icon name="mail" size={14} />
                <span>{EMAIL}</span>
              </div>
              <div className="footer__ci-item">
                <Icon name="map-pin" size={14} />
                <span>{address}</span>
              </div>
              <div className="footer__ci-item">
                <Icon name="clock" size={14} />
                <span>{hoursLine}</span>
              </div>
              <div className="footer__ci-item">
                <Icon name="book-open" size={14} />
                <a href={howToBookUrl(lang)}>{t('nav.howToBook')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
