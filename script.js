/* ===================================================
   HAMID MUGHAL PORTFOLIO - JAVASCRIPT
   =================================================== */

(function () {
  'use strict';

  /* ==============================
     THEME - Dark mode fixed
     ============================== */
  const html = document.documentElement;
  html.setAttribute('data-theme', 'dark');
  localStorage.setItem('portfolio-theme', 'dark');

  /* ==============================
     NAVBAR SCROLL EFFECT
     ============================== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
    toggleBackToTop();
  });

  /* ==============================
     ACTIVE NAV LINK ON SCROLL
     ============================== */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
      const sTop = section.offsetTop - 100;
      if (window.scrollY >= sTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ==============================
     HAMBURGER MENU
     ============================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ==============================
     TYPING ANIMATION
     ============================== */
  const typingTexts = [
    'Graphic Designer',
    'Movie Poster Expert',
    'YouTube Thumbnail Designer',
    'Branding Specialist',
    'Visual Content Creator',
  ];

  const typingEl = document.getElementById('typingText');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = typingTexts[textIndex];

    if (!isDeleting) {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 75);
    } else {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 40);
    }
  }

  setTimeout(typeLoop, 1000);

  /* ==============================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================== */
  const animElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');

          // Trigger progress bars if inside this element
          const fills = entry.target.querySelectorAll('.progress-fill');
          fills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  animElements.forEach(el => observer.observe(el));

  // Also observe project & service cards directly
  const cards = document.querySelectorAll('.project-card, .service-card');
  cards.forEach(card => {
    card.setAttribute('data-animate', '');
    observer.observe(card);
  });

  /* ==============================
     TESTIMONIALS SLIDER
     ============================== */
  const cards_t = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let current = 0;

  // Create dots
  cards_t.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    cards_t[current].classList.remove('active');
    let oldNext = (current + 1) % cards_t.length;
    cards_t[oldNext].classList.remove('next');
    
    dotsContainer.children[current].classList.remove('active');
    
    current = (index + cards_t.length) % cards_t.length;
    
    cards_t[current].classList.add('active');
    let newNext = (current + 1) % cards_t.length;
    cards_t[newNext].classList.add('next');
    
    dotsContainer.children[current].classList.add('active');
  }

  // Start with first card active
  cards_t[0].classList.add('active');
  if (cards_t.length > 1) {
    cards_t[1].classList.add('next');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto slide
  let autoSlide = setInterval(() => goTo(current + 1), 5000);

  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => goTo(current + 1), 5000);
    });
  });

  // Touch/swipe support
  let startX = 0;
  const track = document.querySelector('.testimonials-slider');
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  /* ==============================
     CONTACT FORM
     ============================== */
  // The contact form is handled natively via mailto: action in HTML.


  /* ==============================
     BACK TO TOP
     ============================== */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==============================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==============================
     SKILL CATEGORY HOVER GLOW
     ============================== */
  const skillCats = document.querySelectorAll('.skill-category');
  skillCats.forEach((cat, i) => {
    const colors = ['#6c63ff', '#a78bfa', '#22d3ee', '#6c63ff', '#a78bfa'];
    cat.addEventListener('mouseenter', () => {
      cat.style.boxShadow = `0 0 30px ${colors[i % colors.length]}22`;
    });
    cat.addEventListener('mouseleave', () => {
      cat.style.boxShadow = '';
    });
  });

  /* ==============================
     HERO PARALLAX ORBS
     ============================== */
  const orbs = document.querySelectorAll('.hero-orb');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 0.015;
      orb.style.transform = `translate(${x * 60 * depth}px, ${y * 60 * depth}px) scale(1)`;
    });
  });

  /* ==============================
     STATS COUNT-UP ANIMATION
     ============================== */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.stat-item strong');
        stats.forEach(stat => {
          const target = parseInt(stat.textContent);
          const suffix = stat.textContent.replace(/[0-9]/g, '');
          let count = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = Math.floor(count) + suffix;
          }, 30);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) statObserver.observe(aboutStats);

  /* ==============================
     PROGRESS BARS ANIMATION
     ============================== */
  const progressSection = document.querySelector('.skills-progress');
  if (progressSection) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.progress-fill');
          fills.forEach((fill, index) => {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200 + (index * 150));
          });
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    progressObserver.observe(progressSection);
  }

})();


  /* ==============================
     IMAGE MODAL
     ============================== */
  const modal = document.getElementById('imageModal');
  const fullImage = document.getElementById('fullImage');
  const closeModal = document.getElementById('closeModal');
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.project-card');
      const img = card.querySelector('img');
      if (img) {
        fullImage.src = img.src;
        modal.classList.add('show');
      }
    });
  });

  if(closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }

  /* ==============================
     VIEW MORE BUTTONS
     ============================== */
  const viewMoreBtns = document.querySelectorAll('.view-more-btn');
  viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const grid = document.getElementById(targetId);
      if (grid) {
        grid.classList.toggle('collapsed');
        if (grid.classList.contains('collapsed')) {
          btn.innerHTML = '<span>View More</span> <i class="fas fa-chevron-down"></i>';
        } else {
          btn.innerHTML = '<span>View Less</span> <i class="fas fa-chevron-up"></i>';
        }
      }
    });
  });


  /* ==============================
     STAT ITEM REPEL EFFECT
     ============================== */
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const moveX = -(deltaX * 0.35);
      const moveY = -(deltaY * 0.35);
      
      item.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px) scale(1.05)';
      
      if (!item.classList.contains('animated-hover')) {
        item.classList.add('animated-hover');
      }
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.classList.remove('animated-hover');
    });
  });

