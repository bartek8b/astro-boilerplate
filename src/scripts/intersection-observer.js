/**
 * Intersection Observer setup for animations.
 * Handles both one-time entrance animations and persistent scroll-triggered effects.
 * Optimized for Astro's ClientRouter with 'astro:after-swap' listener.
 */

function initObservers() {
  // 1. Select nodes by specific animation intent
  const oneTimeNodes = document.querySelectorAll('.animate-once');
  const constantNodes = document.querySelectorAll('.animate-constant');

  // 2. One-time Observer: Fires once and stops observing (ideal for reveal effects)
  if (oneTimeNodes.length > 0) {
    const oneTimeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            oneTimeObserver.unobserve(entry.target);
          }
        });
      },
      {
        // Small bottom margin so elements trigger slightly after entering viewport
        rootMargin: '0px 0px -50px 0px',
      },
    );

    oneTimeNodes.forEach((node) => oneTimeObserver.observe(node));
  }

  // 3. Constant Observer: Toggles class every time element enters/leaves (ideal for scroll-sync effects)
  if (constantNodes.length > 0) {
    const constantObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { rootMargin: '0px' },
    );

    constantNodes.forEach((node) => constantObserver.observe(node));
  }
}

// Initial run
initObservers();

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initObservers);
