// Site-wide behaviors ported from the legacy one-page site.

// Navbar scroll state
const navbar = document.getElementById('navbar');
if (navbar) {
  const sync = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', sync, { passive: true });
  sync();
}

// Hamburger drawer
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => drawer.classList.remove('open')),
  );
}

// Scroll reveals
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObserver.observe(el));
