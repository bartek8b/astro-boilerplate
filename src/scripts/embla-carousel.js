import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

// Global variable to store the controller instance for cleanup
let emblaAbortController = null;

const initEmbla = () => {
  // Abort any previous listeners to prevent memory leaks and double events
  if (emblaAbortController) {
    emblaAbortController.abort();
  }

  // Create a new controller and extract the signal
  emblaAbortController = new AbortController();
  const { signal } = emblaAbortController;

  const wrapperNode = document.querySelector('.embla');
  if (!wrapperNode) return;

  const viewportNode = wrapperNode.querySelector('.embla__viewport');
  const prevButtonNode = wrapperNode.querySelector('.embla__prev');
  const nextButtonNode = wrapperNode.querySelector('.embla__next');
  const dotsNode = wrapperNode.querySelector('.embla__dots');

  const emblaApi = EmblaCarousel(viewportNode, { loop: true, align: 'center' }, [
    Autoplay(),
  ]);

  // Handle previous button click
  prevButtonNode.addEventListener(
    'click',
    () => {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollPrev();
    },
    { signal }
  );

  // Handle next button click
  nextButtonNode.addEventListener(
    'click',
    () => {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollNext();
    },
    { signal }
  );

  let dotNodes = [];

  const createDotButtonHtml = (emblaApi, dotsNode) => {
    const dotTemplate = wrapperNode.querySelector('#embla-dot-template');
    const snapList = emblaApi.scrollSnapList();
    
    // Clear existing dots before generating new ones (important for reInit)
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
        { signal }
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

  // Initial dots setup
  createAndSetupDotButtons(emblaApi, dotsNode);

  // Re-run dots setup when carousel re-initializes (e.g., window resize)
  emblaApi.on('reInit', () => createAndSetupDotButtons(emblaApi, dotsNode));
  
  // Toggle active class on dot change
  emblaApi.on('select', (emblaApi) => toggleDotButtonsActive(emblaApi, dotNodes));

  // Ensure autoplay starts correctly
  emblaApi.plugins().autoplay?.play();
};

// Initial load
initEmbla();

// Re-initialize after Astro view transitions
document.addEventListener('astro:after-swap', initEmbla);