# 💫 Astro + Keystatic Headless CMS Boilerplate

### A production-ready starter with a library of reusable, performance-optimized components with a11y (accessibility) features

<br>

## 💡 Why this boilerplate?

* **Headless CMS Integration:** Pre-configured for [Keystatic](https://keystatic.com/), offering a seamless local-first editing experience.
* **Built-in Component Library:** Ready for personalization and high-performance builds:
    * **[Embla Carousel](https://www.embla-carousel.com/) Integration:** Lightweight, touch & mouse gestures friendly with autoplay.
    * **Dynamic Accordion:** Divided content container with the ability to save paragraphs and/or tables.
    * **Responsive slide-out menu** with smooth transitions.
    * **Advanced Theme Engine:** Auto & manual dark/light mode toggle with **FOUC prevention** (Flash of Unstyled Content).
    * **Smart Sticky Header:** Scroll-aware header that hides on scroll-down.
    * **Scroll-Triggered Animations**: Stylish entry animations setter based on Intersection Observer API.

## 🛠️ How to start?

1. Clone the repo: `git clone [your-link]`
2. Install dependencies: `npm install`
3. Launch Dev Server: `npm run dev`
4. Access Admin UI: Go to `http://localhost:4321/keystatic` to manage content.

<br>

# ⚙️ Configuration

<br>

## 🔄 Sync Astro content collections with Keystatic UI

Collections in `src/content.config.ts` must match collections in `keystatic.connfig.ts`. There is a exapmle of use in the code.

For more information check [Defining build-time content collections](https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections) and [Creating a Keystatic config file](https://keystatic.com/docs/installation-astro#creating-a-keystatic-config-file).

<br>

## 🎡 Carousel component

There are 2 modes of carousel in this boilerplate: for pictures (`src/components/CarouselPics.astro`) and for the other type of content (`src/components/CarouselOther.astro`). 

Carousels have to be styled through `src/styles/carousels.css` for common styling in ypur project. There's a option of overwrite slide sizes within `<style>` in each single `<Carousel>` component.

Exapmles of use in `.astro` file:

```
---
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

Component needs title to be desplayed on the "bar" and optional paragraph and/or table. Accordeon needs to be styled within `<script>` tag.

Exapmles of use in `.astro` file:

```
---
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

<Accordion items={myServices} /> -->
```

For information about how to connect components with Keystatic check [Content components](https://keystatic.com/docs/content-components).

<br>

## 📑 Menu (navigtion & footer)

The `navLinks` array within `src/components/Navigation.astro` frontmatter needs to be filled by names with corresponding hrefs. The component will detect the active site upon the URL and mark the proper link with `isActive` class. 