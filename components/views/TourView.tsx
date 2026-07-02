import BookingBox, { type BookingBoxProps } from '../BookingBox';
import Breadcrumbs from '../Breadcrumbs';
import DetailsPanel from '../DetailsPanel';
import Icon from '../Icon';
import ItineraryList from '../ItineraryList';
import JsonLd from '../JsonLd';
import PriceTable from '../PriceTable';
import SiteShell from '../SiteShell';
import StickyBookBar from '../StickyBookBar';
import TourCard from '../TourCard';
import { getTours, type Tour } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { cardSrc, formatBaht, heroSrc } from '@/lib/images';
import { abs, cartUrl, catalogUrl, homeUrl, tourAlternates, tourUrl } from '@/lib/routes';
import { breadcrumbSchema, productSchema, touristTripSchema } from '@/lib/seo';

interface Props {
  lang: Lang;
  tour: Tour;
}

export default function TourView({ lang, tour }: Props) {
  const t = useT(lang);
  const d = tour.data;

  const url = abs(tourUrl(tour, lang));

  const jsonLd = [
    productSchema(tour, lang, url, abs(heroSrc(d.hero))),
    touristTripSchema(tour, lang, url),
    breadcrumbSchema([
      { name: t('nav.home'), url: abs(homeUrl(lang)) },
      { name: t('nav.tours'), url: abs(catalogUrl(lang)) },
      { name: d.title[lang], url },
    ]),
  ];

  const related = getTours()
    .filter(
      (other) =>
        other.id !== tour.id &&
        other.data.categories.some((c) => d.categories.some((mine) => mine.id === c.id)),
    )
    .slice(0, 3);

  const booking: BookingBoxProps = {
    tourId: tour.id,
    cartUrl: cartUrl(lang),
    labels: {
      title: t('booking.title'),
      selectProgram: t('booking.selectProgram'),
      date: t('common.date'),
      total: t('common.total'),
      bookNow: t('common.bookNow'),
      addToCart: t('common.addToCart'),
      added: t('common.addedToCart'),
      note: t('booking.note'),
    },
    variants: d.variants.map((v) => ({
      id: v.id,
      optionLabel: `${v.group ? `${v.group[lang]} · ` : ''}${v.label[lang]} — ${formatBaht(v.adult)}`,
      adult: v.adult,
      child: v.child,
      adultLabel: v.adultLabel?.[lang] ?? t('booking.adults'),
      childLabel: v.childLabel?.[lang] ?? t('booking.children'),
    })),
  };

  return (
    <SiteShell lang={lang} alternates={tourAlternates(tour)}>
      <div className="tourpg-wrap">
        <JsonLd schemas={jsonLd} />
        <header className="page-hero">
          <div className="page-hero__inner">
            <Breadcrumbs
              items={[
                { label: t('nav.home'), href: homeUrl(lang) },
                { label: t('nav.tours'), href: catalogUrl(lang) },
                { label: d.title[lang] },
              ]}
            />
            <h1 className="sec-title">{d.title[lang]}</h1>
            {d.operatingDays && (
              <p className="sec-desc">
                <Icon name="calendar-days" size={14} /> {d.operatingDays[lang]}
              </p>
            )}
          </div>
        </header>

        <section className="sec tourpg">
          <div className="container">
            <div className="tourpg__grid">
              <div className="tourpg__main">
                <div className="tourpg__hero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroSrc(d.hero)}
                    alt={d.title[lang]}
                    width={1200}
                    height={630}
                    loading="eager"
                    fetchPriority="high"
                  />
                  {d.badge && <span className="pcard__tag">{d.badge[lang]}</span>}
                </div>

                <div className="tour-meta" style={{ marginBottom: '1.1rem' }}>
                  {d.meta.map((m, i) => (
                    <div className="tour-meta-i" key={i}>
                      <Icon name={m.icon} size={14} />
                      <span>{m.text[lang]}</span>
                    </div>
                  ))}
                </div>

                <p className="tourpg__sum">{d.summary[lang]}</p>

                {d.highlights.length > 0 && (
                  <ul className="tour-hl">
                    {d.highlights.map((h, i) => (
                      <li key={i}>
                        <Icon name={h.icon} size={14} />
                        <span>{h.text[lang]}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <DetailsPanel icon="tags" label={t('tour.priceTable')} open>
                  <PriceTable tour={tour} lang={lang} />
                  {d.parkFees && (
                    <p className="tdetails__note">
                      <strong>{t('tour.parkFees')}:</strong> {d.parkFees[lang]}
                    </p>
                  )}
                </DetailsPanel>

                {d.itinerary.length > 0 && (
                  <DetailsPanel icon="route" label={t('tour.itinerary')}>
                    <ItineraryList itinerary={d.itinerary} lang={lang} />
                  </DetailsPanel>
                )}

                {(d.includes.length > 0 || d.excludes.length > 0) && (
                  <DetailsPanel
                    icon="list-checks"
                    label={`${t('tour.includes')} / ${t('tour.excludes')}`}
                  >
                    {d.includes.length > 0 && (
                      <ul className="itin-list">
                        {d.includes.map((inc, i) => (
                          <li key={i}>
                            <span className="t">
                              <Icon name="check" size={13} />
                            </span>
                            <span>{inc[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {d.excludes.length > 0 && (
                      <ul className="itin-list" style={{ marginTop: '.6rem' }}>
                        {d.excludes.map((exc, i) => (
                          <li key={i}>
                            <span className="t">
                              <Icon name="x" size={13} />
                            </span>
                            <span>{exc[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </DetailsPanel>
                )}

                {d.notes.length > 0 && (
                  <DetailsPanel icon="info" label={t('tour.notes')}>
                    {d.notes.map((n, i) => (
                      <p className="tdetails__note" key={i}>
                        {n.heading && <strong>{n.heading[lang]}: </strong>}
                        {n.text[lang]}
                      </p>
                    ))}
                  </DetailsPanel>
                )}

                {d.gallery.length > 0 && (
                  <div className="gallery__grid" style={{ marginTop: '1.5rem' }}>
                    {d.gallery.map((g) => (
                      <div className="gal-item" style={{ height: '180px' }} key={g}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cardSrc(g)} alt={d.title[lang]} width={600} height={400} loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <aside className="tourpg__aside">
                <BookingBox {...booking} />
              </aside>
            </div>

            {related.length > 0 && (
              <div style={{ marginTop: '3.5rem' }}>
                <div className="sec-label">{t('tour.related')}</div>
                <div className="pgrid">
                  {related.map((r) => (
                    <TourCard key={r.id} tour={r} lang={lang} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <StickyBookBar tour={tour} lang={lang} />
      </div>
    </SiteShell>
  );
}
