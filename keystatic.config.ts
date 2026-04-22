import { config, fields, collection } from '@keystatic/core';
import { repeating, wrapper } from '@keystatic/core/content-components';

/** * EXAMPLE OF SETUP FOR COMPONENTS ACCORDION, CAROUSELPICS, CAROUSELOTHER:
 * This setup maps the Admin UI to your local file system.
 * It must match the structure defined in /src/content.config.ts.
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
        content: fields.mdx({
          label: 'Page Content',
          components: {
            // ACCORDION
            Accordion: repeating({
              label: 'Accordion Group',
              children: ['AccordionItem'],
              schema: {},
            }),
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
                src: fields.image({
                  label: 'Image',
                  directory: 'src/content/pages',
                  publicPath: './',
                  validation: { isRequired: true },
                }),
              },
            }),

            // CAROUSEL OTHER
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
