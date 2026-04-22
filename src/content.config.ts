// BOILER PLATE DYNAMIC BUILD DEMO

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * ASTRO CONTENT LAYER CONFIGURATION
 * This file defines how Astro sees your data and images.
 */

const pages = defineCollection({
  // 1. LOADER CONFIG
  // We are looking for .mdx and .md files inside src/content/pages.
  // Each folder inside becomes a slug (e.g., /src/content/pages/index/ -> slug: 'index').
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),

  // 2. SCHEMA DEFINITION
  // This validates the Frontmatter (top part of your MDX files).
  schema: ({ image }) =>
    z.object({
      /**
       * 'title' is required in the frontmatter.
       * Keystatic handles this via fields.slug({ name: { label: 'Page Title' } }).
       */
      title: z.string(),

      /**
       * NOTE ON COMPONENTS & IMAGES:
       * Since we are using MDX, most of the data is inside the body, not the frontmatter.
       * Image optimization for components (like CarouselPicSlide) is handled via
       * 'import.meta.glob' inside the component itself, because Astro's content schema
       * doesn't automatically "see" image strings inside the MDX body.
       */
    }),
});

// Exporting collections makes them available via 'getCollection' in [...slug].astro
export const collections = { pages };
