/**
 * Mobile Menu Controller
 * Handles toggling, accessibility states (A11y), and focus management.
 */

let menuController = null;

function initMenu() {
  // Abort previous listeners before re-initializing
  if (menuController) menuController.abort();
  menuController = new AbortController();
  const { signal } = menuController;

  const openNav = document.querySelector('.hamburger-toggle-btn');
  const closeNav = document.querySelector('.x-toggle-btn');
  const nav = document.querySelector('#main-nav');
  const header = document.querySelector('header');

  if (!header || !openNav || !closeNav || !nav) return;

  function setNavState(isOpen) {
    const state = String(isOpen);
    openNav.setAttribute('aria-expanded', state);
    closeNav.setAttribute('aria-expanded', state);
    nav.setAttribute('aria-hidden', String(!isOpen));
    nav.inert = !isOpen;
  }

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

  openNav.addEventListener(
    'click',
    () => {
      openNav.style.display = 'none';
      closeNav.style.display = 'flex';
      nav.style.display = 'flex';
      nav.classList.add('show');

      if (header) {
        const rect = header.getBoundingClientRect();
        nav.style.top = rect.bottom + 'px';
      }

      setNavState(true);
      nav.querySelector('a, button')?.focus();
    },
    { signal },
  );

  closeNav.addEventListener(
    'click',
    () => {
      openNav.style.display = 'flex';
      closeNav.style.display = 'none';
      nav.classList.remove('show');
      nav.style.display = 'none';

      setNavState(false);
      openNav.focus();
    },
    { signal },
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && nav.classList.contains('show')) {
        closeNav.click();
      }
    },
    { signal },
  );

  // Focus trap
  nav.addEventListener(
    'keydown',
    (e) => {
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
    },
    { signal },
  );

  // Keep nav position synced during scroll (useful for sticky headers)
  window.addEventListener(
    'scroll',
    () => {
      const rect = header.getBoundingClientRect();
      nav.style.top = rect.bottom + 'px';
    },
    { signal },
  );

  window.addEventListener('resize', updateLayout, { signal });
  updateLayout();
}

// Initialize on first load
initMenu();

// Re-initialize after Astro View Transitions swap
document.addEventListener('astro:after-swap', initMenu);
