/**
 * Mobile Menu Controller
 * Handles toggling, accessibility states (A11y), and focus management.
 */

function initMenu() {
  const openNav = document.querySelector('.hamburger-toggle-btn');
  const closeNav = document.querySelector('.x-toggle-btn');
  const nav = document.querySelector('#main-nav');
  const header = document.querySelector('header');

  if (!header || !openNav || !closeNav || !nav) return;

  /**
   * Syncs accessibility attributes for both toggle buttons and the nav element.
   * Both buttons report the same 'aria-expanded' state as they control the same target.
   */
  function setNavState(isOpen) {
    const state = String(isOpen);
    openNav.setAttribute('aria-expanded', state);
    closeNav.setAttribute('aria-expanded', state);

    // Hide nav from screen readers when closed
    nav.setAttribute('aria-hidden', String(!isOpen));
    // 'inert' prevents focusing elements inside the hidden nav
    nav.inert = !isOpen;
  }

  /**
   * Adjusts UI based on viewport width.
   * Ensures nav is visible on desktop and resets mobile states.
   */
  function updateLayout() {
    if (window.innerWidth > 768) {
      nav.style.display = 'flex';
      nav.classList.remove('show');
      openNav.style.display = 'none';
      closeNav.style.display = 'none';
      setNavState(true);
    } else {
      if (!nav.classList.contains('show')) {
        nav.style.display = 'none';
        openNav.style.display = 'flex';
        closeNav.style.display = 'none';
        setNavState(false);
      }
    }
  }

  // Open menu action
  openNav.addEventListener('click', () => {
    openNav.style.display = 'none';
    closeNav.style.display = 'flex';
    nav.style.display = 'flex';
    nav.classList.add('show');

    // Dynamic positioning below the header
    if (header) {
      const rect = header.getBoundingClientRect();
      nav.style.top = rect.bottom + 'px';
    }

    setNavState(true);
    // Focus first focusable element for keyboard navigation
    nav.querySelector('a, button')?.focus();
  });

  // Close menu action
  closeNav.addEventListener('click', () => {
    openNav.style.display = 'flex';
    closeNav.style.display = 'none';
    nav.classList.remove('show');
    nav.style.display = 'none';

    setNavState(false);
    openNav.focus();
  });

  // Close menu on 'Escape' key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
      closeNav.click();
    }
  });

  /**
   * Focus Trap Logic
   * Keeps focus within the mobile menu when it's open.
   */
  nav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || window.innerWidth > 768) return;

    const focusable = Array.from(nav.querySelectorAll('a, button')).filter(
      (el) => el.offsetParent !== null,
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Keep nav position synced during scroll (useful for sticky headers)
  window.addEventListener('scroll', () => {
      if (!header || !openNav || !closeNav || !nav) return; {
      const rect = header.getBoundingClientRect();
      nav.style.top = rect.bottom + 'px';
    }
  });

  window.addEventListener('resize', updateLayout);
  updateLayout();
}

// Initialize on first load
initMenu();

// Re-initialize after Astro View Transitions swap
document.addEventListener('astro:after-swap', initMenu);
