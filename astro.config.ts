import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tema ayarlarını doğrudan dosya içinde tanımlıyoruz (Hatanın %100 çözümü)
const SITE = {
  website: "https://enesinsanaldefteri.com.tr",
  showArchives: true,
};

export default defineConfig({
  output: "static",
  site: SITE.website,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  vite: {
    plugins: [tailwindcss() as any],
  },
});
