import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import SiteBehaviors from './SiteBehaviors';
import type { Lang } from '@/lib/i18n';
import type { Alternates } from '@/lib/routes';

interface Props {
  lang: Lang;
  alternates: Alternates;
  children: ReactNode;
}

/** Per-page chrome: nav (needs per-page language alternates), footer, behaviors. */
export default function SiteShell({ lang, alternates, children }: Props) {
  return (
    <>
      <Nav lang={lang} alternates={alternates} />
      <main>{children}</main>
      <Footer lang={lang} />
      <SiteBehaviors />
    </>
  );
}
