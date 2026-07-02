import { getCategories } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { catalogUrl, categoryUrl } from '@/lib/routes';

interface Props {
  lang: Lang;
  /** category id currently shown, or 'all' for the catalog page. */
  active: string;
  /** true when rendered on a light background. */
  onLight?: boolean;
}

export default function CategoryChips({ lang, active, onLight = false }: Props) {
  const t = useT(lang);
  const categories = getCategories();
  return (
    <nav className={`chips${onLight ? ' on-light' : ''}`} aria-label={t('nav.categories')}>
      <a href={catalogUrl(lang)} className={`chip${active === 'all' ? ' active' : ''}`}>
        {t('common.allTours')}
      </a>
      {categories.map((c) => (
        <a
          key={c.id}
          href={categoryUrl(c, lang)}
          className={`chip${active === c.id ? ' active' : ''}`}
        >
          {c.data.shortTitle?.[lang] ?? c.data.title[lang]}
        </a>
      ))}
    </nav>
  );
}
