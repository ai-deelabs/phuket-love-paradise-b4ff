import type { ReactNode } from 'react';
import '../globals.css';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';

export default function ThaiRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
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
