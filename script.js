/* ============================================================
   SCRIPT.JS — DRA. ISA URIA
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initProcDots();
  initResultadosReveal();
  initScrollReveal();
  initSmoothScroll();
});


/* ============================================================
   NAVBAR — transparente no topo, sólida no scroll
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}


/* ============================================================
   MENU MOBILE
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navDrawer');
  const overlay   = document.getElementById('navOverlay');
  const closeBtn  = document.getElementById('drawerClose');

  if (!hamburger || !drawer || !overlay) return;

  const drawerLinks = drawer.querySelectorAll('.drawer-link, .drawer-btn');

  const open = () => {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    hamburger.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', open);
  closeBtn  && closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  drawerLinks.forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => e.key === 'Escape' && close());
}


/* ============================================================
   PROCEDIMENTOS — dots acompanham o scroll do carrossel
   ============================================================ */
function initProcDots() {
  const track = document.getElementById('procTrack');
  const dots  = document.querySelectorAll('.proc-dot');

  if (!track || !dots.length) return;

  track.addEventListener('scroll', () => {
    const cardWidth = track.querySelector('.proc-card')?.offsetWidth || track.clientWidth * 0.78;
    const gap       = 16;
    const index     = Math.round(track.scrollLeft / (cardWidth + gap));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }, { passive: true });
}


/* ============================================================
   RESULTADOS — reveal com IntersectionObserver (com unobserve)
   ============================================================ */
function initResultadosReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const all   = Array.from(items);
      const col   = all.indexOf(entry.target) % 2; // coluna 0 ou 1
      const delay = col * 100;

      setTimeout(() => entry.target.classList.add('is-revealed'), delay);
      observer.unobserve(entry.target); // sem re-trigger, sem piscar
    });
  }, {
    threshold:   0.25,
    rootMargin: '0px 0px -48px 0px'
  });

  items.forEach(item => observer.observe(item));
}


/* ============================================================
   SCROLL REVEAL GERAL — elementos com .reveal
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, {
    threshold:   0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   SMOOTH SCROLL — links âncora, compensa a navbar
   ============================================================ */
function initSmoothScroll() {
  const OFFSET = 60;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

lucide.createIcons();
