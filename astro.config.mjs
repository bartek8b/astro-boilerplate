import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Change to target URL when implementing a real project
  site: 'https://site-name.domain/',
  integrations: [sitemap(), react(), keystatic(), mdx()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // The Node adapter is required for Keystatic's API routes to function (both in dev and build).
  // Feel free to swap it for your deployment platform's adapter (e.g., Cloudflare, Vercel, Netlify).
  adapter: node({
    mode: 'standalone',
  }),
});
