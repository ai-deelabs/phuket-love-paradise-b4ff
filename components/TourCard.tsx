import Icon from './Icon';
import type { Tour } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { cardSrc, formatBaht } from '@/lib/images';
import { tourUrl } from '@/lib/routes';

interface Props {
  tour: Tour;
  lang: Lang;
  loading?: 'lazy' | 'eager';
}

export default function TourCard({ tour, lang, loading = 'lazy' }: Props) {
  const t = useT(lang);
  const d = tour.data;
  const url = tourUrl(tour, lang);
  const perLabel = {
    person: t('common.perPerson'),
    vehicle: t('common.perVehicle'),
    group: t('common.perGroup'),
  }[d.priceUnit];
  const metaItems = d.meta.slice(0, 2);

  return (
    <article className="pcard">
      <a className="pcard__pic" href={url} tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cardSrc(d.hero)} alt={d.title[lang]} width={760} height={560} loading={loading} />
        {d.badge && <span className="pcard__tag">{d.badge[lang]}</span>}
      </a>
      <div className="pcard__body">
        <h3>
          <a href={url}>{d.title[lang]}</a>
        </h3>
        <p className="pcard__sum">{d.summary[lang]}</p>
        {metaItems.length > 0 && (
          <div className="pcard__meta">
            {metaItems.map((m, i) => (
              <span key={i}>
                <Icon name={m.icon} size={13} />
                {m.text[lang]}
              </span>
            ))}
          </div>
        )}
        <div className="pcard__foot">
          <div className="pcard__price">
            <span className="lbl">{t('common.from')}</span>
            <span className="amt">
              {formatBaht(d.priceFrom)} <small>{perLabel}</small>
            </span>
          </div>
          <span className="pcard__btn">
            {t('common.viewDetails')}
            <Icon name="arrow-right" size={13} />
          </span>
        </div>
      </div>
    </article>
  );
}
