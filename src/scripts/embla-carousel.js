import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const wrapperNode = document.querySelector('.embla');
const viewportNode = wrapperNode.querySelector('.embla__viewport');
const prevButtonNode = wrapperNode.querySelector('.embla__prev');
const nextButtonNode = wrapperNode.querySelector('.embla__next');
const dotsNode = wrapperNode.querySelector('.embla__dots');

const emblaApi = EmblaCarousel(viewportNode, { loop: true, align: 'center' }, [
  Autoplay(),
]);

prevButtonNode.addEventListener(
  'click',
  () => {
    emblaApi.plugins().autoplay?.stop();
    emblaApi.scrollPrev();
  },
  false,
);
nextButtonNode.addEventListener(
  'click',
  () => {
    emblaApi.plugins().autoplay?.stop();
    emblaApi.scrollNext();
  },
  false,
);

let dotNodes = [];

const createDotButtonHtml = (emblaApi, dotsNode) => {
  const dotTemplate = wrapperNode.querySelector('#embla-dot-template');
  const snapList = emblaApi.scrollSnapList();
  dotsNode.innerHTML = snapList.reduce(
    (acc) => acc + dotTemplate.innerHTML,
    '',
  );
  return Array.from(dotsNode.querySelectorAll('.embla__dot'));
};

const addDotButtonClickHandlers = (emblaApi, dotNodes) => {
  dotNodes.forEach((dotNode, index) => {
    dotNode.addEventListener(
      'click',
      () => {
        emblaApi.plugins().autoplay?.stop();
        emblaApi.scrollTo(index);
      },
      false,
    );
  });
};

const toggleDotButtonsActive = (emblaApi, dotNodes) => {
  if (!dotNodes.length) return;
  const previous = emblaApi.previousScrollSnap();
  const selected = emblaApi.selectedScrollSnap();
  dotNodes[previous].classList.remove('embla__dot--selected');
  dotNodes[selected].classList.add('embla__dot--selected');
};

const createAndSetupDotButtons = (emblaApi, dotsNode) => {
  dotNodes = createDotButtonHtml(emblaApi, dotsNode);
  addDotButtonClickHandlers(emblaApi, dotNodes);
  toggleDotButtonsActive(emblaApi, dotNodes);
};

createAndSetupDotButtons(emblaApi, dotsNode);
emblaApi.on('reInit', () => createAndSetupDotButtons(emblaApi, dotsNode));
emblaApi.on('select', (emblaApi) => toggleDotButtonsActive(emblaApi, dotNodes));

emblaApi.plugins().autoplay?.play();
