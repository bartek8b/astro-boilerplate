import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Change to target URL when implementing a real project
  site: 'https://site-name.domain/',
  integrations: [sitemap(), react(), keystatic(), mdx()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
