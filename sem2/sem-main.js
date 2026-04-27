/* ============================================================
   Study Fusion – Semester JS  (sem1/sem-main.js)
   Scroll-reveal + auto copyright year (shared across sem pages)
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* -- Auto copyright year -- */
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* -- Scroll-Reveal -- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('visible'));
    }

    /* -- Subscribe button ripple -- */
    document.querySelectorAll('.subscribe-btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const r = document.createElement('span');
            r.style.cssText = `
        position:absolute;border-radius:50%;
        width:60px;height:60px;
        background:rgba(255,255,255,0.35);
        transform:scale(0);
        animation:sfRipple 0.5s linear;
        pointer-events:none;
        left:${e.offsetX - 30}px;top:${e.offsetY - 30}px;
      `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(r);
            r.addEventListener('animationend', () => r.remove());
        });
    });

    if (!document.getElementById('sf-ripple-style')) {
        const s = document.createElement('style');
        s.id = 'sf-ripple-style';
        s.textContent = `@keyframes sfRipple { to { transform:scale(4); opacity:0; } }`;
        document.head.appendChild(s);
    }
});
