# 💫 Astro + Keystatic Headless CMS Boilerplate

### A production-ready starter with a library of reusable, performance-optimized components with a11y (accessibility) features

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

## 🔄 Sync Astro content collections with Keystatic UI

Collections in `src/content.config.ts` must match collections in `keystatic.connfig.ts`. There is an example of use in the code.

For more information check [Defining build-time content collections](https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections) and [Creating a Keystatic config file](https://keystatic.com/docs/installation-astro#creating-a-keystatic-config-file).

<br>

## 🎡 Carousel component

There are 2 modes of carousel in this boilerplate: for pictures (`src/components/CarouselPics.astro`) and for the other type of content (`src/components/CarouselOther.astro`).

Common styles are managed via src/styles/carousels.css. You can overwrite slide sizes locally using a <style> tag within the component itself or its parent.

Examples of use in a `.astro` file:

```
---
// src/pages/pictures.astro

import CarouselPics from '../components/CarouselPics.astro';
import image1 from '../assets/hero-1.jpg';
import image2 from '../assets/hero-2.jpg';

const gallery = [
  { src: image1, alt: "Description of first image" },
  { src: image2, alt: "Description of second image" },
];
---

<CarouselPics images={gallery} />
```

```
---
// src/pages/richText.astro

import CarouselOther from '../components/CarouselOther.astro';

const fill = [
  { title: "Review1", para1: "Paragraph with opinion", para2: "Customer" },
  { title: "Review2", para1: "Paragraph with opinion", para2: "Customer" },
];
---

<CarouselOther items={fill} />
```

For information about how to connect components with Keystatic check [Content components](https://keystatic.com/docs/content-components).

<br>

## 🪗 Accordion component

The component is styled within its own `<style>` tag. Accordion items require a `title` (displayed on the toggle bar) and support optional paragraphs and/or tables. You can extend or modify the content types by adjusting the `Props` interface in the component file.

Examples of use in a `.astro` file:

```
---
// src/pages/offer.astro

import Accordion from '../components/Accordion.astro';

const myServices = [
  {
    title: 'Webpages',
    para: 'Description of the provided services',
    table: {
      headers: ['Service', 'Price'],
      rows: [['Landing Page', '1500 PLN'], ['Multi site', '2500 PLN']]
    }
  }
];
---

<Accordion items={myServices} />
```

For information about how to connect components with Keystatic check [Content components](https://keystatic.com/docs/content-components).

<br>

## 📑 Menu (navigtion & footer)

The `navLinks` array within `src/components/Navigation.astro` should be populated with labels and their corresponding `hrefs`. The component automatically detects the active page based on the URL and applies the `isActive` class. It also accepts an `external` prop which, if `true`, appends an external link icon.

The `<Navigation>` component should be nested within the `<Header>` component. Both should be styled within their respective `<style>` tags.

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

<!-- Rest of the code -->

```

```
---
// src/pages/index.astro

import Header from '../components/Header.astro'; // Poprawiono z Accordion.astro
import Navigation from '../components/Navigation.astro';
---

<Header>
    <Navigation />
</Header>
```
