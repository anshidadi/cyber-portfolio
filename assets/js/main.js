/**
 * ANSHID KT — Premium Portfolio JavaScript
 * 3D Effects | Smooth Animations | Performance Optimized
 */

(function () {
  'use strict';

  // ── DOM Cache ──
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  const preloader = $('#preloader');
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const navLinks = $$('.nav-link');
  const themeToggle = $('#themeToggle');
  const contactForm = $('#contactForm');
  const typedRole = $('#typedRole');
  const heroCard = $('#heroCard');
  const codeContent = $('#codeContent');
  const backToTop = $('#backToTop');
  const cursorDot = $('.cursor-dot');
  const cursorOutline = $('.cursor-ring');
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('.project-card');
  const particleCanvas = $('#particleCanvas');

  // ────────────────────────────────────────────
  // 1. PRELOADER
  // ────────────────────────────────────────────
  let loaded = false;
  function hidePreloader() {
    if (loaded) return;
    loaded = true;
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAll();
    }, 2200);
  }
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', hidePreloader);
  // Failsafe: hide after 5s max
  setTimeout(hidePreloader, 5000);

  // ────────────────────────────────────────────
  // 2. CUSTOM CURSOR
  // ────────────────────────────────────────────
  let mx = 0, my = 0, cx = 0, cy = 0;

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    if (cursorDot) {
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top = my + 'px';
    }
    if (cursorOutline) {
      cursorOutline.style.left = cx + 'px';
      cursorOutline.style.top = cy + 'px';
    }
    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  $$('a, button, [data-tilt], .service-card, .project-card, .skill-tag, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline?.classList.remove('hover'));
  });

  if (window.innerWidth > 768) animateCursor();

  // ────────────────────────────────────────────
  // 3. THEME
  // ────────────────────────────────────────────
  const THEME_KEY = 'anshid-theme';
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }
  function setTheme(t) {
    document.body.classList.toggle('light-theme', t === 'light');
    localStorage.setItem(THEME_KEY, t);
  }
  setTheme(getTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const cur = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      setTheme(cur === 'light' ? 'dark' : 'light');
    });
  }

  // ────────────────────────────────────────────
  // 4. NAVIGATION
  // ────────────────────────────────────────────
  let scrollTick = false;
  function onScroll() {
    if (!scrollTick) {
      requestAnimationFrame(() => {
        handleScroll();
        scrollTick = false;
      });
      scrollTick = true;
    }
  }

  function handleScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 60);
    updateActiveLink(y);
  }

  function updateActiveLink(y) {
    const scrollPos = y + 120;
    $$('section[id]').forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + h) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  function toggleMenu() {
    navToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
  }
  function closeMenu() {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      if (target) {
        const offset = target.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
      closeMenu();
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') &&
      !navMenu.contains(e.target) && !navToggle?.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ────────────────────────────────────────────
  // 5. TYPING EFFECT
  // ────────────────────────────────────────────
  const roles = [
    'Cybersecurity Engineer',
    'Full-Stack Developer',
    'AI Developer',
    'Game Developer'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeRole() {
    if (!typedRole) return;
    const role = roles[roleIdx];
    if (deleting) {
      charIdx--;
      typedRole.textContent = role.substring(0, charIdx);
    } else {
      charIdx++;
      typedRole.textContent = role.substring(0, charIdx);
    }
    let speed = deleting ? 40 : 80;
    if (!deleting && charIdx === role.length) {
      speed = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeRole, speed);
  }
  setTimeout(typeRole, 1800);

  // ────────────────────────────────────────────
  // 6. CODE WINDOW CONTENT
  // ────────────────────────────────────────────
  function fillCodeWindow() {
    if (!codeContent) return;
    codeContent.innerHTML =
      `<span style="color:var(--purple)">const</span> <span style="color:var(--cyan)">anshid</span> = {\n` +
      `  <span style="color:var(--pink)">role</span>: <span style="color:var(--green)">"Security Engineer"</span>,\n` +
      `  <span style="color:var(--pink)">skills</span>: [<span style="color:var(--green)">"Pentest"</span>, <span style="color:var(--green)">"React"</span>,\n` +
      `           <span style="color:var(--green)">"Python"</span>, <span style="color:var(--green)">"AI/ML"</span>],\n` +
      `  <span style="color:var(--pink)">passion</span>: <span style="color:var(--green)">"Building secure</span>\n` +
      `            <span style="color:var(--green)">digital futures"</span>,\n` +
      `  <span style="color:var(--pink)">available</span>: <span style="color:var(--cyan)">true</span>\n` +
      `};`;
  }

  // ────────────────────────────────────────────
  // 7. 3D HERO CARD TILT
  // ────────────────────────────────────────────
  function initHeroCard() {
    if (!heroCard || window.innerWidth < 1024) return;
    document.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = (e.clientX - centerX) * 0.012;
      const rotateX = -(e.clientY - centerY) * 0.012;
      heroCard.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // ────────────────────────────────────────────
  // 8. SCROLL REVEAL
  // ────────────────────────────────────────────
  function initScrollReveal() {
    const elements = $$('.reveal-fade, .reveal-slide, .reveal-scale, .reveal-flip, .reveal-pop, .skill-category, .skill-bar');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Animate skill bars
          if (entry.target.classList.contains('skill-bar')) {
            const level = entry.target.getAttribute('data-level');
            const fill = entry.target.querySelector('.bar-fill');
            if (fill && level) {
              fill.style.width = level + '%';
            }
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // ────────────────────────────────────────────
  // 9. ANIMATED COUNTERS
  // ────────────────────────────────────────────
  function initCounters() {
    const counters = $$('.stat-number, .counter, .exp-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || el.getAttribute('data-count') || '0');
          if (!target || isNaN(target)) return;
          const start = performance.now();
          const duration = 2000;
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => observer.observe(c));
  }

  // ────────────────────────────────────────────
  // 10. PROJECT FILTERS
  // ────────────────────────────────────────────
  function initFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach((card, i) => {
          const cat = card.getAttribute('data-category');
          const show = filter === 'all' || cat === filter;
          card.style.transition = `opacity 0.3s ${i * 0.05}s, transform 0.3s ${i * 0.05}s`;
          if (show) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => { card.style.display = 'none'; }, 350);
          }
        });
      });
    });
  }

  // ────────────────────────────────────────────
  // 11. 3D TILT ON CARDS
  // ────────────────────────────────────────────
  function initTilt() {
    if (window.innerWidth < 768) return;
    $$('.hover-3d').forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * 8;
        const ry = ((x / rect.width) - 0.5) * -8;
        this.style.transform =
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  // ────────────────────────────────────────────
  // 12. PARTICLE CANVAS
  // ────────────────────────────────────────────
  function initParticles() {
    if (!particleCanvas) return;
    const ctx = particleCanvas.getContext('2d');
    let w, h, particles;
    const count = Math.min(50, Math.floor(window.innerWidth / 35));

    function resize() {
      w = particleCanvas.width = window.innerWidth;
      h = particleCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        const colors = ['0,229,255', '156,92,255', '0,230,118'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    particles = Array.from({ length: count }, () => new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ────────────────────────────────────────────
  // 13. CONTACT FORM
  // ────────────────────────────────────────────
  function initContactForm() {
    if (!contactForm) return;
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(this);
      const name = fd.get('name')?.toString().trim();
      const email = fd.get('email')?.toString().trim();
      const subject = fd.get('subject')?.toString().trim();
      const message = fd.get('message')?.toString().trim();
      if (!name || !email || !subject || !message) {
        notify('Please fill in all fields', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        notify('Please enter a valid email', 'error');
        return;
      }
      const btn = this.querySelector('button[type="submit"]');
      const txt = btn.querySelector('.btn-text');
      const loader = btn.querySelector('.btn-loader');
      if (txt) txt.style.display = 'none';
      if (loader) loader.style.display = 'flex';
      btn.disabled = true;

      setTimeout(() => {
        notify('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
        if (txt) txt.style.display = '';
        if (loader) loader.style.display = 'none';
        btn.disabled = false;
      }, 1500);
    });
  }

  function notify(msg, type) {
    const existing = $('.notification');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'notification';
    el.textContent = msg;
    Object.assign(el.style, {
      position: 'fixed', bottom: '24px', right: '24px',
      padding: '14px 24px', borderRadius: '12px', zIndex: '9999',
      fontSize: '0.9rem', fontWeight: '500', color: '#fff',
      background: type === 'success' ? '#00e676' : '#ff3ea5',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      transform: 'translateY(20px)', opacity: '0',
      transition: '0.3s cubic-bezier(0.16,1,0.3,1)',
      backdropFilter: 'blur(12px)',
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    });
    setTimeout(() => {
      el.style.transform = 'translateY(20px)';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 4000);
  }

  // ────────────────────────────────────────────
  // 14. PARALLAX SPHERES
  // ────────────────────────────────────────────
  function initParallax() {
    const orbs = $$('.gradient-sphere');
    if (!orbs.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = 0.03 + i * 0.015;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  // ────────────────────────────────────────────
  // 15. CURRENT YEAR
  // ────────────────────────────────────────────
  const yearEl = $('#currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ────────────────────────────────────────────
  // INIT ALL
  // ────────────────────────────────────────────
  function initAll() {
    fillCodeWindow();
    initHeroCard();
    initScrollReveal();
    initCounters();
    initFilters();
    initTilt();
    initParticles();
    initContactForm();
    initParallax();
  }

  // ────────────────────────────────────────────
  // Console Easter Egg
  // ────────────────────────────────────────────
  console.log(
    '%c⚡ ANSHID KT',
    'font-size:20px;font-weight:bold;color:#00e5ff;'
  );
  console.log(
    '%cCrafted with precision → hello@anshidkt.in',
    'font-size:12px;color:#9c5cff;'
  );

})();
