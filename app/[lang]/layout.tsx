import type { ReactNode } from 'react';
import { PREFIXED_LOCALES, type Lang } from '@/lib/i18n';
import '../globals.css';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // This segment also serves the top-level Thai keyword pages (see [lang]/page.tsx).
  const htmlLang = (PREFIXED_LOCALES as string[]).includes(lang) ? (lang as Lang) : 'th';
  return (
    <html lang={htmlLang}>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS_URL} rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {children}
      </body>
    </html>
  );
}
