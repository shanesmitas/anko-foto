import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import process from 'node:process';

const base = process.env.PUBLIC_BASE_PATH ?? '/moto-camera-guide-jp';
const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: {
        ja: 'moto カメラ遊びガイド',
        en: 'moto Camera Play Guide'
      },
      description: '写真を撮りながら、すぐに設定を見つけられる日英ガイド。',
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
        en: { label: 'English', lang: 'en' }
      },
      pagefind: true,
      lastUpdated: false,
      credits: false,
      customCss: ['./src/styles/global.css'],
      components: {
        Header: './src/components/CustomHeader.astro',
        Footer: './src/components/CustomFooter.astro'
      },
      sidebar: [
        { label: 'ホーム', translations: { en: 'Home' }, link: '/' },
        { label: '撮り方', translations: { en: 'Recipes' }, link: '/recipes/' },
        { label: '設定', translations: { en: 'Controls' }, link: '/controls/' },
        { label: 'モード', translations: { en: 'Modes' }, link: '/modes/' },
        { label: '困った時', translations: { en: 'Help' }, link: '/help/' },
        { label: 'ミニチャレンジ', translations: { en: 'Challenges' }, link: '/challenges/' },
        { label: '安全', translations: { en: 'Safety' }, link: '/safety/' },
        { label: 'このガイドについて', translations: { en: 'About' }, link: '/about/' }
      ]
    })
  ],
  vite: {
    build: { sourcemap: false }
  }
});
