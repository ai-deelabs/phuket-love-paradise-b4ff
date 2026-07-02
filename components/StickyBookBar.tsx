import type { Tour } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { formatBaht } from '@/lib/images';

interface Props {
  tour: Tour;
  lang: Lang;
}

export default function StickyBookBar({ tour, lang }: Props) {
  const t = useT(lang);
  return (
    <div className="sbar">
      <div className="sbar__price">
        <span className="lbl">{t('common.from')}</span>
        <span className="amt">{formatBaht(tour.data.priceFrom)}</span>
      </div>
      <a className="btn-gold" href="#bookingBox">
        {t('common.bookNow')}
      </a>
    </div>
  );
}
