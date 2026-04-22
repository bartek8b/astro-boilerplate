import { config, fields, collection } from '@keystatic/core';
import { repeating, wrapper } from '@keystatic/core/content-components';

/**
 * KEYSTATIC CONFIGURATION - BOILERPLATE DEMO
 * This file maps the Admin UI to your local file system and MDX components.
 */

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Page Title' } }),

        /**
         * MDX FIELD CONFIGURATION
         * This is where we define custom components available in the Keystatic editor.
         */
        content: fields.mdx({
          label: 'Page Content',
          components: {
            // ACCORDION
            // 'repeating' creates a group that can only contain specific children.
            Accordion: repeating({
              label: 'Accordion Group',
              children: ['AccordionItem'],
              schema: {},
            }),
            // 'wrapper' allows wrapping text/content and adding specific fields (props).
            AccordionItem: wrapper({
              label: 'Accordion Item',
              schema: {
                title: fields.text({ label: 'Item Title' }),
              },
            }),

            // CAROUSEL PICS
            CarouselPics: repeating({
              label: 'Image Carousel',
              children: ['CarouselPicSlide'],
              schema: {},
            }),
            CarouselPicSlide: wrapper({
              label: 'Image Slide',
              schema: {
                alt: fields.text({ label: 'Alt Text' }),
                /**
                 * IMPORTANT: 'publicPath: "./"' is mandatory!
                 * It ensures that Keystatic saves the image path as "./image.webp".
                 * This relative path is required for the 'import.meta.glob' hack
                 * in CarouselPicSlide.astro to resolve and optimize images via Astro Assets.
                 */
                src: fields.image({
                  label: 'Image',
                  directory: 'src/content/pages', // Images stay next to the MDX file
                  publicPath: './',
                  validation: { isRequired: true },
                }),
              },
            }),

            // CAROUSEL OTHER (TEXT-BASED)
            CarouselOther: repeating({
              label: 'Content Carousel',
              children: ['CarouselOtherSlide'],
              schema: {},
            }),
            CarouselOtherSlide: wrapper({
              label: 'Content Slide',
              schema: {
                title: fields.text({ label: 'Slide Title (Optional)' }),
              },
            }),
          },
        }),
      },
    }),
  },
});
