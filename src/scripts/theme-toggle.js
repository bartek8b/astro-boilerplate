let themeController = null;

function applyTheme(isThemeDark) {
  document.documentElement.setAttribute(
    'data-theme',
    isThemeDark ? 'dark' : 'light',
  );
  // NOTE: do NOT mutate button.innerHTML here — icons should be embedded in HTML and toggled via CSS.
}

function initThemeToggle() {
  // Abort previous listeners before re-initializing
  if (themeController) themeController.abort();
  themeController = new AbortController();
  const { signal } = themeController;

  const colorSchemeBtn = document.querySelector('.theme-toggle-btn');
  if (!colorSchemeBtn) return;

  let isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
  colorSchemeBtn.setAttribute(
    'aria-label',
    isDark ? 'Switch to light theme' : 'Switch to dark theme',
  );

  colorSchemeBtn.addEventListener(
    'click',
    () => {
      isDark = !isDark;
      applyTheme(isDark);

      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('Failed setting local storage item:', e);
      }

      colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
      colorSchemeBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme',
      );
    },
    { signal },
  );
}

// Initialize on page load
initThemeToggle();

// Re-initialize after Astro view transitions swap
document.addEventListener('astro:after-swap', initThemeToggle);
