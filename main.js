/* ============================================================
   Study Fusion – main.js
   Handles: scroll-reveal animations, dynamic copyright year,
            subscribe button micro-interaction
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. Auto Copyright Year
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------
     2. Scroll-Reveal via Intersection Observer
        Add class="reveal" to any element you want to animate
        in when it scrolls into view.
     -------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately for old browsers
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* --------------------------------------------------------
     3. Subscribe Button – ripple micro-interaction
     -------------------------------------------------------- */
  document.querySelectorAll('.subscribe-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:60px; height:60px;
        background:rgba(255,255,255,0.35);
        transform:scale(0);
        animation:btnRipple 0.5s linear;
        pointer-events:none;
        left:${e.offsetX - 30}px; top:${e.offsetY - 30}px;
      `;
      // btn needs position:relative – ensured in CSS
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* Inject ripple keyframe once */
  if (!document.getElementById('sf-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'sf-ripple-style';
    style.textContent = `
      @keyframes btnRipple {
        to { transform:scale(4); opacity:0; }
      }
    `;
    document.head.appendChild(style);
  }
});
