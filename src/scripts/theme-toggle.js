let isDark;

function applyTheme(isThemeDark) {
  isDark = isThemeDark;
  document.documentElement.setAttribute(
    'data-theme',
    isThemeDark ? 'dark' : 'light',
  );
  // NOTE: do NOT mutate button.innerHTML here — icons should be embedded in HTML and toggled via CSS.
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme(isDark);
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // If localStorage is unavailable (e.g. incognito mode)
    console.warn('Failed setting local storage item:', e);
  }
}

function initThemeToggle() {
  // !!! IMPORTANT !!! SET SELECTOR .theme-toggle-btn in HTML/CSS
  const colorSchemeBtn = document.querySelector('.theme-toggle-btn');

  if (colorSchemeBtn) {
    // Sync state with the attribute set by the critical script in Head
    isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Set initial ARIA attributes
    colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
    colorSchemeBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme',
    );

    colorSchemeBtn.addEventListener('click', () => {
      toggleTheme();
      // Update ARIA after switch
      colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
      colorSchemeBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme',
      );
    });
  }
}

// Initialize on page load
initThemeToggle();

// Re-initialize after Astro view transitions swap (if used)
document.addEventListener('astro:after-swap', initThemeToggle);
