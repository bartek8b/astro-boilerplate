// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Change to target URL when implementing a real project
  site: 'https://site-name.domain',
  integrations: [sitemap()],
});
