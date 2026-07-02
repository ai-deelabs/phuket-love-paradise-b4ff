import type { Tour, Variant } from '@/lib/content';
import type { Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import { formatBaht } from '@/lib/images';

interface Props {
  tour: Tour;
  lang: Lang;
}

export default function PriceTable({ tour, lang }: Props) {
  const t = useT(lang);

  // Preserve insertion order while grouping variants by their group label.
  const groups: { caption: string | null; rows: Variant[] }[] = [];
  for (const v of tour.data.variants) {
    const caption = v.group ? v.group[lang] : null;
    const last = groups[groups.length - 1];
    if (last && last.caption === caption) last.rows.push(v);
    else groups.push({ caption, rows: [v] });
  }

  return (
    <>
      {groups.map((g, gi) => {
        const hasChild = g.rows.some((r) => r.child !== null);
        const adultHeader = g.rows[0]?.adultLabel?.[lang] ?? t('common.adult');
        const childHeader = g.rows.find((r) => r.childLabel)?.childLabel?.[lang] ?? t('common.child');
        return (
          <table className="ptable" key={gi}>
            {g.caption && <caption>{g.caption}</caption>}
            <thead>
              <tr>
                <th>{t('common.program')}</th>
                <th>{adultHeader}</th>
                {hasChild && <th>{childHeader}</th>}
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.label[lang]}</td>
                  <td>{formatBaht(r.adult)}</td>
                  {hasChild && <td>{r.child !== null ? formatBaht(r.child) : '—'}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </>
  );
}
