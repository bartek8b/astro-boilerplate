// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod for schema validation
import { z } from 'astro/zod';

/** * EXAMPLE OF IMPLEMENTATION:
 * This configuration must sync with /keystatic.config.ts.
 * Required folders: '/src/content/blog/' and '/src/assets/images/blog/'.
 * Always keep a .gitkeep file in empty directories to ensure they are tracked by Git.
 */

// 4. Define a `loader` and `schema` for the collection
const blog = defineCollection({
  // Pattern includes .mdoc for Markdoc support if needed
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // 'image()' enables Astro's native image optimization pipeline
      coverImage: image().optional(),
      // 'z.coerce.date()' ensures strings from frontmatter are parsed as JS Date objects
      pubDate: z.coerce.date(),
    }),
});

// 5. Register your collection(s)
export const collections = { blog };
