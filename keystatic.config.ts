import { config, fields, collection } from '@keystatic/core';

/** * EXAMPLE OF SETUP:
 * This setup maps the Admin UI to your local file system.
 * It must match the structure defined in /src/content.config.ts.
 */

export default config({
  // Use 'local' for development. Change to 'github' or 'cloud' for production/client access.
  storage: {
    kind: 'local',
  },
  collections: {
    // Collection key ('blog') must match the key in 'collections' object in content.config.ts
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      // Determines where new entry files (.mdx) will be stored
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        pubDate: fields.date({ label: 'Pub Date' }),
        coverImage: fields.image({
          label: 'Cover Image',
          // Physical location where Keystatic saves the uploaded files
          directory: 'src/assets/images/blog',
          // Relative path written into the .mdx file (how Astro finds the image)
          publicPath: '../../assets/images/blog/',
        }),
        content: fields.mdx({ label: 'Post Content' }),
      },
    }),
  },
});
