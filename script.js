
 // LUMIÈRE — Phase 1 cinematic enhancements
(() => {
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (hero && !reducedMotion.matches) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();

      hero.style.setProperty(
        '--pointer-x',
        `${event.clientX - rect.left}px`
      );

      hero.style.setProperty(
        '--pointer-y',
        `${event.clientY - rect.top}px`
      );
    }, { passive: true });
  }

  const sections = document.querySelectorAll(
    '.section, .product, .philosophy, .ritual'
  );

  if (!('IntersectionObserver' in window) || reducedMotion.matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(section => {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
  });
})();
