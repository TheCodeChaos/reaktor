// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || "https://TheCodeChaos.github.io/reaktor/",
  base,
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
