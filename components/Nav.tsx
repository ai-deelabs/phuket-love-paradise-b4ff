import Icon from './Icon';
import CartBadge from './CartBadge';
import { getCategories } from '@/lib/content';
import { LANG_LABELS, LOCALES, type Lang } from '@/lib/i18n';
import { useT } from '@/lib/ui';
import {
  cartUrl,
  catalogUrl,
  categoryUrl,
  homeUrl,
  howToBookUrl,
  type Alternates,
} from '@/lib/routes';

interface Props {
  lang: Lang;
  alternates: Alternates;
}

export default function Nav({ lang, alternates }: Props) {
  const t = useT(lang);
  const categories = getCategories();
  const packagesCat = categories.find((c) => c.id === 'packages');

  const links = [
    { href: homeUrl(lang), label: t('nav.home') },
    { href: catalogUrl(lang), label: t('nav.tours') },
    ...(packagesCat
      ? [
          {
            href: categoryUrl(packagesCat, lang),
            label: packagesCat.data.shortTitle?.[lang] ?? packagesCat.data.title[lang],
          },
        ]
      : []),
    { href: howToBookUrl(lang), label: t('nav.howToBook') },
  ];

  return (
    <nav className="nav" id="navbar">
      <a className="nav__brand" href={homeUrl(lang)}>
        <div className="nav__brand-th">ภูเก็ตเลิฟพาราไดซ์</div>
        <div className="nav__brand-en">Phuket Love Paradise</div>
      </a>
      <div className="nav__right">
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="lang-sw" role="group" aria-label="Language">
          <Icon name="globe" size={14} />
          {LOCALES.map((l) => (
            <a
              key={l}
              href={alternates[l]}
              className={`lang-sw__opt${l === lang ? ' active' : ''}`}
              lang={l}
              hrefLang={l}
            >
              {LANG_LABELS[l]}
            </a>
          ))}
        </div>
        <a className="nav__cart" href={cartUrl(lang)} aria-label={t('nav.cart')}>
          <Icon name="shopping-cart" size={20} />
          <CartBadge />
        </a>
        <button className="nav__burger" id="burger" aria-label="Menu" type="button">
          <Icon name="menu" size={22} />
        </button>
      </div>
      <div className="nav__drawer" id="drawer">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        {categories
          .filter((c) => c.id !== 'packages')
          .map((c) => (
            <a key={c.id} href={categoryUrl(c, lang)}>
              {c.data.title[lang]}
            </a>
          ))}
      </div>
    </nav>
  );
}
