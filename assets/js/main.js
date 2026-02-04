/**
 * ANSHID KT - Portfolio JavaScript
 * Production-ready vanilla JS
 */

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');
  const contactForm = document.getElementById('contactForm');
  const typedRole = document.getElementById('typedRole');
  const currentYearEl = document.getElementById('currentYear');
  const skillBars = document.querySelectorAll('.skill-progress');
  const animateElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .highlight');

  // ========================================
  // Theme Management
  // ========================================
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

  // Initialize theme
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ========================================
  // Navigation
  // ========================================
  
  // Scroll detection for navbar
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
  }

  // Update active navigation link based on scroll position
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

  // Mobile menu toggle
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  // Close mobile menu when clicking a link
  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Smooth scroll to section
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

  // Event listeners for navigation
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

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // ========================================
  // Typing Effect
  // ========================================
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
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeRole, typeSpeed);
  }

  // Start typing effect
  setTimeout(typeRole, 1000);

  // ========================================
  // Skill Bar Animation
  // ========================================
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      const rect = bar.getBoundingClientRect();
      
      if (rect.top < window.innerHeight * 0.9 && !bar.classList.contains('animated')) {
        bar.style.width = progress + '%';
        bar.classList.add('animated');
      }
    });
  }

  // ========================================
  // Scroll Animations
  // ========================================
  function handleScrollAnimations() {
    animateElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('animate-on-scroll', 'visible');
      }
    });
    
    animateSkillBars();
  }

  window.addEventListener('scroll', handleScrollAnimations, { passive: true });
  
  // Initial check
  setTimeout(handleScrollAnimations, 100);

  // ========================================
  // Particle Background
  // ========================================
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
      
      // Random colors
      const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-green)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
    }
  }

  createParticles();

  // ========================================
  // Contact Form
  // ========================================
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(function() {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<p>' + message + '</p>';
    
    // Styles
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      background: type === 'success' ? 'var(--accent-green)' : '#ef4444',
      color: type === 'success' ? 'var(--bg-primary)' : 'white',
      fontWeight: '500',
      zIndex: '9999',
      animation: 'fade-in 0.3s ease',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    });

    document.body.appendChild(notification);

    setTimeout(function() {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      notification.style.transition = 'all 0.3s ease';
      setTimeout(function() { notification.remove(); }, 300);
    }, 4000);
  }

  // ========================================
  // Current Year
  // ========================================
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ========================================
  // Lazy Loading for Images
  // ========================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // Performance: Debounce scroll events
  // ========================================
  let scrollTimeout;
  const originalScrollHandler = handleScrollAnimations;
  
  function debouncedScrollHandler() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(originalScrollHandler);
  }

  // Replace scroll listener with debounced version for animations
  window.removeEventListener('scroll', handleScrollAnimations);
  window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

  // ========================================
  // Console Easter Egg
  // ========================================
  console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #00d9ff;');
  console.log('%cInterested in working together? Reach out at hello@anshidkt.in', 'font-size: 14px; color: #a855f7;');

})();
