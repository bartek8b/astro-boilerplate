import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const wrapperNode = document.querySelector('.embla');
const viewportNode = wrapperNode.querySelector('.embla__viewport');
const prevButtonNode = wrapperNode.querySelector('.embla__prev');
const nextButtonNode = wrapperNode.querySelector('.embla__next');

const emblaApi = EmblaCarousel(viewportNode, { loop: true, align: 'center' }, [
  Autoplay(),
]);

prevButtonNode.addEventListener('click', () => emblaApi.goToPrev(), false);
nextButtonNode.addEventListener('click', () => emblaApi.goToNext(), false);

// Use when loop is false to set button inactive

// const toggleButtonsDisabled = (emblaApi) => {
//   const setButtonState = (button, enabled) => {
//     button.toggleAttribute('disabled', !enabled);
//   };
//   setButtonState(prevButtonNode, emblaApi.canScrollPrev());
//   setButtonState(nextButtonNode, emblaApi.canScrollNext());
// };

// toggleButtonsDisabled(emblaApi);
// emblaApi.on('select', toggleButtonsDisabled);
// emblaApi.on('reInit', toggleButtonsDisabled);

emblaApi.plugins().autoplay?.play();
