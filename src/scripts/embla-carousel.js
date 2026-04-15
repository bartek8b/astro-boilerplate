import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const wrapperNode = document.querySelector('.embla');
const viewportNode = wrapperNode.querySelector('.embla__viewport');
const prevButtonNode = wrapperNode.querySelector('.embla__prev');
const nextButtonNode = wrapperNode.querySelector('.embla__next');

const emblaApi = EmblaCarousel(
  viewportNode,
  { loop: true, align: 'center' },
  [Autoplay()],
);

prevButtonNode.addEventListener('click', () => emblaApi.goToPrev(), false);
nextButtonNode.addEventListener('click', () => emblaApi.goToNext(), false);

emblaApi.plugins().autoplay?.play();
