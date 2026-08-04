import { defineConfig, envField, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tema ayarlarını doğrudan dosya içinde tanımlıyoruz (Hatanın %100 çözümü)
const SITE = {
  website: process.env.CF_PAGES_URL || "https://enesinsanaldefteri.com.tr",
  showArchives: true,
};

export default defineConfig({
  output: "static",
  // site: SITE.website,
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
  fonts: [
    {
      provider: fontProviders.local(),
      name: "wotfard",
      cssVariable: "--font-wotfard",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/wotfard.woff2", "./src/assets/fonts/wotfard.ttf"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "sriracha",
      cssVariable: "--font-sriracha",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/sriracha.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "firacode",
      cssVariable: "--font-firacode",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/firacode.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "cascadia-code",
      cssVariable: "--font-cascadia-code",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/cascadia-code.woff2"],
          },
        ],
      },
    },
  ],
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
