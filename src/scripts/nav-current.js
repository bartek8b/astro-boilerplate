function updateNavCurrent() {
  const links = document.querySelectorAll('header nav a');
  const current = window.location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href === current ||
      (href !== '/' && (current === href || current.startsWith(href + '/')))
    ) {
      link.classList.add('current');
    } else {
      link.classList.remove('current');
    }
  });
}

// After first load
updateNavCurrent();

// After every View Transitions
document.addEventListener('astro:after-swap', updateNavCurrent);
