# 💫 Astro + Keystatic Headless CMS Boilerplate

### A production-ready starter with a library of reusable components with a11y features, offering optimal DX by providing template files while retaining many ways to customize UI.

<br>

## 💡 Why this boilerplate?

- **Headless CMS Integration:** Pre-configured for [Keystatic](https://keystatic.com/), offering a seamless local-first editing experience.
- **Built-in Component Library:** Ready for personalization and high-performance builds:
  - **[Embla Carousel](https://www.embla-carousel.com/) Integration:** Lightweight, touch & mouse gestures friendly with autoplay.
  - **Dynamic Accordion:** Flexible content container with the ability to save paragraphs and/or tables.
  - **Responsive slide-out menu** with smooth transitions.
  - **Advanced Theme Engine:** Auto & manual dark/light mode toggle with **FOUC prevention** (Flash of Unstyled Content).
  - **Smart Sticky Header:** Scroll-aware header that hides on scroll-down.
  - **Scroll-Triggered Animations**: Stylish entry animations setter powered by Intersection Observer API.

## 🛠️ How to start?

1. Clone the repo: `git clone [your-link]`
2. Install dependencies: `npm install`
3. Launch Dev Server: `npm run dev`
4. Access Admin UI: Go to `http://localhost:4321/keystatic` to manage content.

<br>

# ⚙️ Configuration

<br>

## 🧱 Structure of the boilerplate

```
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Accordion.astro
│   │   ├── AccordionItem.astro
│   │   ├── CarouselOther.astro       # For rich text content
│   │   ├── CarouselOtherSlide.astro
│   │   ├── CarouselPics.astro        # For images
│   │   ├── CarouselPicSlide.astro
│   │   ├── Head.astro                # Metadata
│   │   ├── Header.astro              # Wrapper for Navigation with on scroll toggling visibility
│   │   └── Navigation.astro
│   ├── content/                      # Keystatic driven content (Markdown)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── [...slug].astro              # Dynamic route for rendering CMS pages
│   ├── scripts/                      # Global JS logic, components helpers
│   ├── styles/                       # Global CSS, Carousel items helpers
│   └── content.config.ts             # Astro content layer
├── public/
├── astro.config.mjs
├── keystatic.config.ts               # Keystatic panel config - needs to fit Astro content layer
├── tsconfig.json
└── package.json
```

<br>

## 🗺️ Sitemap integration

This boilerplate includes the `@astrojs/sitemap` integration. To generate a valid `sitemap-index.xml`, you **must manually update the** `site` property in the `astro.config.mjs` file with your production URL.

```
// astro.config.mjs

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // IMPORTANT: Replace with your actual production URL
  site: 'https://your-domain.com/',
  integrations: [sitemap(), react(), keystatic(), mdx()],
});
```

**Note:** See also [Astro Sitemap integration guide](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

<br>

## 🔄 Sync Astro content collections with Keystatic UI

Collections in `src/content.config.ts` must match collections in `keystatic.config.ts`. **These files need to be adapted to your project's specific needs.** Check [Keystatic docs](https://keystatic.com/docs/introduction) for more information.

The provided demo uses `src/pages/[...slug].astro` to render pages dynamically. You can manage and add components manually via the Keystatic Admin UI at `http://localhost:4321/keystatic`.

**Note:** See also [Defining build-time content collections](https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections), and [Creating a Keystatic config file](https://keystatic.com/docs/installation-astro#creating-a-keystatic-config-file).

<br>

## 🧩 Layout and components

This boilerplate has `src/layouts/BaseLayout.astro` with nested `<Head />` component. This layout can serve as container for all the pages within your project. It takes props: `lang` (`'en'` by default), `title`, `description` and `ogImgUrl` (`'/ogp-image.jpg'` by default).

```
src/layouts/BaseLayout.astro
---
import 'modern-normalize/modern-normalize.css';
import '../styles/global.css';
import Head from '../components/Head.astro';
import Header from '../components/Header.astro';

const {
  lang = 'en',
  title,
  description,
  ogImgUrl = '/ogp-image.jpg',
} = Astro.props;
---

<html lang={lang}>
  <Head title={title} description={description} ogImgUrl={ogImgUrl} />

  <body>
    <Header transition:persist />

    <main transition:name="main" transition:animate="fade">
      <slot />
    </main>

    <footer transition:persist>
      </footer>
  </body>

  <!-- Rest of the code -->
</html>
```

Example of use:

```
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home Page" description="Welcome to our site">
  <h1>Hello World</h1>
  <p>This content will be injected into the slot of BaseLayout.</p>
</BaseLayout>
```

**Note:** See also [Components](https://docs.astro.build/en/basics/astro-components/), [Layouts](https://docs.astro.build/en/basics/layouts/), and [Rendering Keystatic content](https://keystatic.com/docs/installation-astro#rendering-keystatic-content).

<br>

## 📑 Menu (navigation & header)

The `navLinks` array within `src/components/Navigation.astro` should be populated with labels and their corresponding `href` paths. The component automatically detects the active page based on the URL and applies the `.current` class. It also supports an `external` property which, if set to `true`, appends an external link icon.

The `<Navigation>` component is designed to be nested within a `<Header>` component. Both should be styled within their respective `<style>` tags.

The `href` values in `navLinks` must match the file structure in `src/pages/` or your dynamic routes.

Example of use:

```
---
// src/components/Navigation.astro

const navLinks = [
  { name: 'home', href: '/' },
  { name: 'page two', href: '/page-two' },
  { name: 'external', href: 'https://...', external: true },
];

const pathname = new URL(Astro.url).pathname;
const currentPath = pathname.replace(/\/$/, '');
---

```

```
---
// src/pages/index.astro

import Header from '../components/Header.astro';
import Navigation from '../components/Navigation.astro';
import logo from './assets/logo.webp'
---

<Header>
  <a href="/">
    <Image src={logo} alt="Company Logo" width={150} />
  </a>
  <Navigation />
</Header>
```

<br>

## 🌙 Dark mode toggling

To prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), a blocking script is included in the `<Head />` component. It's useful especially when using dark color scheme to avoid flash of white page while loading page. For this reason, `<Head />` is an integral part of `src/layouts/BaseLayout.astro`.

The theme toggle consists of a `<button>` located in the `<Navigation />` component, with its logic handled by `src/scripts/theme-toggle.js`. Ensure that the class names remain consistent between the script and the component.

```
// src/scripts/theme-toggle.js

// ...
const colorSchemeBtn = document.querySelector('.theme-toggle-btn');
// ...
```

```
---
// src/components/Navigation.astro
---
<button class="theme-toggle-btn" aria-label="Toggle dark mode">
  </button>

<style>
  .theme-toggle-btn {
    cursor: pointer;
    color: currentColor;
    padding: 0.5rem;
  }
</style>
```

**Note:** See also the `[data-theme='dark']` block in `src/style/global.css` for theme-specific CSS variables.

<br>

## 🎡 Carousel component

There are 2 modes of carousel in this boilerplate: one for pictures (`src/components/CarouselPics.astro`) and one for trich content (`src/components/CarouselOther.astro`). Both act as containers and must be populated with their respective slide components: `CarouselPicSlide.astro` or `CarouselOtherSlide.astro`.

Common styles are managed via `src/styles/carousels.css`. You can overwrite slide sizes locally using a `<style>` tag within the component itself or its parent.

Examples of use in a `.astro` file:

Picture Carousel (with Local Assets):

```
---
// src/pages/pictures.astro
import CarouselPics from '../components/CarouselPics.astro';
import CarouselPicSlide from '../components/CarouselPicSlide.astro';

import image1 from '../assets/hero-1.jpg';
import image2 from '../assets/hero-2.jpg';
---

<CarouselPics>
  <CarouselPicSlide src={image1} alt="Description of first image" />
  <CarouselPicSlide src={image2} alt="Description of second image" />
</CarouselPics>
```

Content Carousel (Rich Text/Reviews):

```
---
---
// src/pages/reviews.astro
import CarouselOther from '../components/CarouselOther.astro';
import CarouselOtherSlide from '../components/CarouselOtherSlide.astro';
---

<CarouselOther>
  <CarouselOtherSlide title="Customer Review">
    <p>This is a paragraph with a customer's opinion.</p>
    <span>John Doe</span>
  </CarouselOtherSlide>

  <CarouselOtherSlide title="Expert Opinion">
    <p>Another slide with different content.</p>
  </CarouselOtherSlide>
</CarouselOther>
```

**Note:** See also how to connect components with Keystatic [Content components](https://keystatic.com/docs/content-components).

<br>

## 🪗 Accordion component

The Accordion is styled within its own `<style>` tag. Accordion items require a `title` (displayed on the toggle bar) and are containers for `<slot />` of any kind.

Each `AccordionItem` requires a `title` and uses `crypto.randomUUID()` to ensure unique IDs for ARIA attributes.

Examples of use in a `.astro` file:

```
---
// src/pages/offer.astro
import Accordion from '../components/Accordion.astro';
import AccordionItem from '../components/AccordionItem.astro';
---

<Accordion>
  <AccordionItem title="Webpages">
    <p>Description of the provided services.</p>

    <table>
      <thead>
        <tr><th>Service</th><th>Price</th></tr>
      </thead>
      <tbody>
        <tr><td>Landing Page</td><td>3000 PLN</td></tr>
        <tr><td>Multi site</td><td>9000 PLN</td></tr>
      </tbody>
    </table>
  </AccordionItem>

  <AccordionItem title="SEO Optimization">
    <p>Basic SEO setup for your website.</p>
  </AccordionItem>
</Accordion>
```

**Note:** See also how to connect components with Keystatic [Content components](https://keystatic.com/docs/content-components).

<br>
