/**
 * ANSHID KT - Premium Portfolio JavaScript
 * Advanced 3D Animations & Interactivity
 */

(function() {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  const preloader = document.getElementById('preloader');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');
  const contactForm = document.getElementById('contactForm');
  const typedRole = document.getElementById('typedRole');
  const currentYearEl = document.getElementById('currentYear');
  const heroCard = document.getElementById('heroCard');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const sliderDots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const statNumbers = document.querySelectorAll('.stat-number, .counter');
  const tiltElements = document.querySelectorAll('[data-tilt]');
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  // ============================================
  // Preloader
  // ============================================
  function hidePreloader() {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
    }, 2000);
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('load', hidePreloader);

  // ============================================
  // Custom Cursor
  // ============================================
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }

    if (cursorOutline) {
      cursorOutline.style.left = cursorX + 'px';
      cursorOutline.style.top = cursorY + 'px';
    }

    requestAnimationFrame(updateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll('a, button, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline?.classList.remove('hover');
    });
  });

  updateCursor();

  // ============================================
  // Theme Management
  // ============================================
  const THEME_KEY = 'anshid-portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ============================================
  // Navigation
  // ============================================
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScrollTo(targetId);
      closeMobileMenu();
    });
  });

  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // ============================================
  // Typing Effect
  // ============================================
  const roles = [
    'Cybersecurity Engineer',
    'Web Developer',
    'AI Developer',
    'Game Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeRole() {
    if (!typedRole) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRole.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedRole.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
  }

  setTimeout(typeRole, 1500);

  // ============================================
  // 3D Card Tilt Effect
  // ============================================
  function initTiltEffect() {
    tiltElements.forEach(card => {
      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    });
  }

  function handleTilt(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  // ============================================
  // Hero 3D Card Effect
  // ============================================
  function initHeroCard() {
    if (!heroCard) return;

    document.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = mouseX * 0.01;
      const rotateX = -mouseY * 0.01;

      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // Animated Counters
  // ============================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter, .exp-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || counter.getAttribute('data-count') || '0');
      if (isNaN(target) || target === 0) return;
      
      const duration = 2000;
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(counter);
    });
  }

  // ============================================
  // Project Filters
  // ============================================
  function initProjectFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ============================================
  // Testimonials Slider
  // ============================================
  let currentSlide = 0;
  const totalSlides = testimonialCards.length;

  function showSlide(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      if (i === index) {
        card.classList.add('active');
      }
    });

    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-slide
  setInterval(nextSlide, 5000);

  // ============================================
  // Contact Form
  // ============================================
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name')?.trim();
      const email = formData.get('email')?.trim();
      const subject = formData.get('subject')?.trim();
      const message = formData.get('message')?.trim();

      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<p>' + message + '</p>';

    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      padding: '16px 24px',
      borderRadius: '12px',
      background: type === 'success' ? '#22c55e' : '#ef4444',
      color: 'white',
      fontWeight: '500',
      zIndex: '9999',
      animation: 'slideInRight 0.3s ease',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      notification.style.transition = 'all 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ============================================
  // Particle Background
  // ============================================
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = Math.min(40, Math.floor(window.innerWidth / 40));

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (12 + Math.random() * 8) + 's';

      const colors = ['#00d9ff', '#a855f7', '#22c55e'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(particle);
    }
  }

  // ============================================
  // Smooth Parallax Effect
  // ============================================
  function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      orbs.forEach((orb, index) => {
        const speed = 0.05 + index * 0.02;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // ============================================
  // Current Year
  // ============================================
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ============================================
  // Keyboard Navigation
  // ============================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ============================================
  // Initialize All Animations
  // ============================================
  function initAnimations() {
    initScrollReveal();
    animateCounters();
    initTiltEffect();
    initHeroCard();
    initProjectFilters();
    initParallax();
    createParticles();
  }

  // ============================================
  // Performance: Throttle scroll events
  // ============================================
  let ticking = false;

  function throttledScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.removeEventListener('scroll', handleScroll);
  window.addEventListener('scroll', throttledScroll, { passive: true });

  // ============================================
  // Console Easter Egg
  // ============================================
  console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #00d9ff;');
  console.log('%cInterested in working together? Reach out at hello@anshidkt.in', 'font-size: 14px; color: #a855f7;');
  console.log('%cThis site was handcrafted with ❤️', 'font-size: 12px; color: #22c55e;');

})();
