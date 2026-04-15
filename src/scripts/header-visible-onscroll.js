/**
 * Header visibility toggle on scroll.
 * Hides header when scrolling down, shows when scrolling up.
 * Requires 'header' element and '.header-hidden' class in CSS.
 */

let scrollController = null;

function initHeaderScroll() {
  // Abort previous listeners before re-initializing
  if (scrollController) scrollController.abort();
  scrollController = new AbortController();
  const { signal } = scrollController;

  let lastScrollTop = 0;
  const header = document.querySelector('header');

  if (!header) return;

  const handleScroll = () => {
    const scrollToTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollToTop > lastScrollTop && scrollToTop > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollToTop <= 0 ? 0 : scrollToTop;
  };

  window.addEventListener('scroll', handleScroll, { passive: true, signal });
}

// Initial run
initHeaderScroll();

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initHeaderScroll);
