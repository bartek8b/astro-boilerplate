import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

// Global variable to store the controller instance for cleanup
let emblaAbortController = null;
// Array to store API instances for cleanup
let emblaInstances = [];

// Function to initialize a single carousel instance
const initSingleEmbla = (wrapperNode, signal) => {
  const viewportNode = wrapperNode.querySelector('.embla__viewport');
  const prevButtonNode = wrapperNode.querySelector('.embla__prev');
  const nextButtonNode = wrapperNode.querySelector('.embla__next');
  const dotsNode = wrapperNode.querySelector('.embla__dots');
  const dotTemplate = wrapperNode.querySelector('.embla-dot-template');

  // Ensure all required elements exist for this instance
  if (!viewportNode || !dotsNode || !dotTemplate) return;

  const emblaApi = EmblaCarousel(
    viewportNode,
    { loop: true, align: 'center' },
    [Autoplay()],
  );

  let dotNodes = [];

  // 1. Generate dot buttons HTML from template
  const createDotButtonHtml = (emblaApi, dotsNode) => {
    const templateContent = dotTemplate.innerHTML;
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map((_, index) => templateContent.replaceAll('{{INDEX}}', index + 1))
      .join('');

    return Array.from(dotsNode.querySelectorAll('.embla__dot'));
  };

  // 2. Add click listeners to dots
  const addDotButtonClickHandlers = (emblaApi, dotNodes) => {
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener(
        'click',
        () => {
          emblaApi.plugins().autoplay?.stop();
          emblaApi.scrollTo(index);
        },
        { signal },
      );
    });
  };

  // 3. Manage active state (classes and ARIA attributes)
  const toggleDotButtonsActive = (emblaApi, dotNodes) => {
    if (!dotNodes.length) return;

    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();

    // Reset previous dot
    dotNodes[previous].classList.remove('embla__dot--selected');
    dotNodes[previous].setAttribute('aria-selected', 'false');
    dotNodes[previous].setAttribute('tabindex', '-1');

    // Activate current dot
    dotNodes[selected].classList.add('embla__dot--selected');
    dotNodes[selected].setAttribute('aria-selected', 'true');
    dotNodes[selected].setAttribute('tabindex', '0');
  };

  // 4. Master setup function for dots
  const createAndSetupDotButtons = (emblaApi, dotsNode) => {
    // Just to be 100% safe during reInit (resize)
    emblaApi.plugins().autoplay?.stop();

    dotNodes = createDotButtonHtml(emblaApi, dotsNode);
    addDotButtonClickHandlers(emblaApi, dotNodes);
    toggleDotButtonsActive(emblaApi, dotNodes);

    emblaApi.plugins().autoplay?.play();
  };

  // Navigation arrows listeners
  prevButtonNode?.addEventListener(
    'click',
    () => {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollPrev();
    },
    { signal },
  );

  nextButtonNode?.addEventListener(
    'click',
    () => {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollNext();
    },
    { signal },
  );

  // Initial dots initialization
  createAndSetupDotButtons(emblaApi, dotsNode);

  // Embla API event listeners
  emblaApi.on('reInit', () => createAndSetupDotButtons(emblaApi, dotsNode));
  emblaApi.on('select', (emblaApi) =>
    toggleDotButtonsActive(emblaApi, dotNodes),
  );

  // Ensure autoplay starts
  emblaApi.plugins().autoplay?.play();

  return emblaApi;
};

/**
 * Main initialization function for all carousels on the page
 */
const initEmbla = () => {
  // 1. Destroy existing Embla instances to free memory
  emblaInstances.forEach((api) => api.destroy());
  emblaInstances = [];

  // 2. Abort custom event listeners
  if (emblaAbortController) emblaAbortController.abort();
  emblaAbortController = new AbortController();
  const { signal } = emblaAbortController;

  const wrapperNodes = document.querySelectorAll('.embla');
  if (!wrapperNodes.length) return;

  // 3. Initialize and store new instances
  wrapperNodes.forEach((wrapperNode) => {
    const api = initSingleEmbla(wrapperNode, signal);
    if (api) emblaInstances.push(api);
  });
};

// Initial load
initEmbla();

// Support for Astro View Transitions
document.addEventListener('astro:after-swap', initEmbla);
