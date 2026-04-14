/**
 * Header visibility toggle on scroll.
 * Hides header when scrolling down, shows when scrolling up.
 * Requires 'header' element and '.header-hidden' class in CSS.
 */

function initHeaderScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  // Safety check: only run if header exists on the current page
  if (!header) return;

  const handleScroll = () => {
    const scrollToTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Hide header if scrolling down and passed 100px threshold
    if (scrollToTop > lastScrollTop && scrollToTop > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    // Ensure lastScrollTop is never negative
    lastScrollTop = scrollToTop <= 0 ? 0 : scrollToTop;
  };

  // Use passive: true for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initial run
initHeaderScroll();

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initHeaderScroll);
