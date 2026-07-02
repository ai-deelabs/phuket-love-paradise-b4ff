'use client';

import { useEffect } from 'react';

/** Site-wide behaviors ported from the legacy site: navbar scroll state,
 * hamburger drawer, scroll-reveal animations. */
export default function SiteBehaviors() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const sync = () => navbar?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', sync, { passive: true });
    sync();

    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const toggle = () => drawer?.classList.toggle('open');
    const closers = drawer ? Array.from(drawer.querySelectorAll('a')) : [];
    const close = () => drawer?.classList.remove('open');
    burger?.addEventListener('click', toggle);
    closers.forEach((a) => a.addEventListener('click', close));

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', sync);
      burger?.removeEventListener('click', toggle);
      closers.forEach((a) => a.removeEventListener('click', close));
      observer.disconnect();
    };
  }, []);
  return null;
}
