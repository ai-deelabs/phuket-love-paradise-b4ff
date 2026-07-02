// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phuketloveparadise.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/cart/'),
      i18n: {
        defaultLocale: 'th',
        locales: {
          th: 'th-TH',
          en: 'en',
          ru: 'ru',
        },
      },
    }),
  ],
});
