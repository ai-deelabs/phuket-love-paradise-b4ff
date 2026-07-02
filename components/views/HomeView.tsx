import Icon from '../Icon';
import JsonLd from '../JsonLd';
import SiteShell from '../SiteShell';
import WaveSep from '../WaveSep';
import Hero from '../home/Hero';
import About from '../home/About';
import FeaturedTours from '../home/FeaturedTours';
import Experiences from '../home/Experiences';
import Stats from '../home/Stats';
import Testimonials from '../home/Testimonials';
import Gallery from '../home/Gallery';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { abs, homeAlternates, homeUrl, howToBookUrl } from '@/lib/routes';
import { travelAgencySchema } from '@/lib/seo';

export const homeSeo = (lang: Lang) => ({
  title: {
    th: 'ภูเก็ตเลิฟพาราไดซ์ — ทัวร์หรูหราในภูเก็ต',
    en: 'Phuket Love Paradise — Luxury Tours in Phuket',
    ru: 'Phuket Love Paradise — люксовые туры на Пхукете',
  }[lang],
  description: {
    th: 'ภูเก็ตเลิฟพาราไดซ์ บริการทัวร์หรูหราในภูเก็ต สัมผัสความงดงามของทะเลอันดามันกับทีมงานมืออาชีพ พร้อมบริการส่วนตัวที่ใส่ใจทุกรายละเอียด',
    en: 'Phuket Love Paradise offers luxury tours in Phuket. Experience the beauty of the Andaman Sea with our professional team and personalized service attentive to every detail.',
    ru: 'Phuket Love Paradise — люксовые туры на Пхукете. Откройте красоту Андаманского моря с профессиональной командой и персональным сервисом, внимательным к каждой детали.',
  }[lang],
});

export default function HomeView({ lang }: { lang: Lang }) {
  const t = useT(lang);

  const ctaLabel = {
    th: 'ติดต่อเรา',
    en: 'Get in Touch',
    ru: 'Связаться с нами',
  }[lang];
  const ctaTitle = {
    th: 'พร้อมช่วยวางแผนทริปในฝันของคุณ',
    en: 'Ready to Plan Your Dream Trip',
    ru: 'Готовы спланировать поездку вашей мечты',
  }[lang];
  const ctaDesc = {
    th: 'เลือกช่องทางที่สะดวกสำหรับคุณ ทีมงานของเราพร้อมตอบทุกคำถามและช่วยจองทัวร์ให้คุณ',
    en: 'Reach us through whichever channel suits you best — our team is ready to answer your questions and book your tour.',
    ru: 'Свяжитесь с нами удобным способом — наша команда ответит на вопросы и забронирует тур.',
  }[lang];

  return (
    <SiteShell lang={lang} alternates={homeAlternates()}>
      <JsonLd schemas={[travelAgencySchema(abs(homeUrl(lang)))]} />

      <Hero lang={lang} />

      {/* wave hero→about */}
      <WaveSep bg="var(--navy)" fill="#0a1628" shape="hero" />

      {/* About renders its own trailing wave: about(navy)→tours(ivory) */}
      <About lang={lang} />

      <FeaturedTours lang={lang} />

      {/* wave tours(ivory)→exp(navy) */}
      <WaveSep bg="var(--ivory)" fill="#0a1628" shape="rise" />

      <Experiences lang={lang} />

      <Stats lang={lang} />

      <Testimonials lang={lang} />

      {/* wave testi(navy-mid)→gallery(ivory) */}
      <WaveSep bg="var(--navy-mid)" fill="#faf6ee" shape="cap" />

      <Gallery lang={lang} />

      {/* wave gallery(ivory)→contact(navy) */}
      <WaveSep bg="var(--ivory)" fill="#0a1628" shape="rise" />

      <section className="sec contact" id="contact">
        <div className="container contact__inner">
          <div className="contact__lead reveal center-text">
            <div className="sec-label center">
              <Icon name="message-circle" size={14} />
              <span>{ctaLabel}</span>
            </div>
            <h2 className="sec-title lt">{ctaTitle}</h2>
            <p className="sec-desc lt">{ctaDesc}</p>
            <div className="center-text" style={{ marginTop: '1.75rem' }}>
              <a className="btn-gold" href={howToBookUrl(lang)}>
                <Icon name="calendar-check" size={16} />
                <span>{t('nav.howToBook')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
