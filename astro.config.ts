import { defineConfig, envField } from 'astro/config';
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
  env: {
    schema: {
      PUBLIC_SOCIAL_GITHUB: envField.string({ context: "client", access: "public", optional: true, default: "" }),
      PUBLIC_SOCIAL_X: envField.string({ context: "client", access: "public", optional: true, default: "" }),
      PUBLIC_SOCIAL_LINKEDIN: envField.string({ context: "client", access: "public", optional: true, default: "" }),
      PUBLIC_SOCIAL_EMAIL: envField.string({ context: "client", access: "public", optional: true, default: "" }),
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: "client", access: "public", optional: true, default: "" }),
      PUBLIC_EDIT_POST_URL: envField.string({ context: "client", access: "public", optional: true, default: "" }),
    },
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
