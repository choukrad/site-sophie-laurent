/* ========================================
   MAIN JAVASCRIPT - Site Psychologue
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ----------------------------------------
  // Mobile Menu Toggle
  // ----------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header__nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ----------------------------------------
  // Header Scroll Effect
  // ----------------------------------------
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // ----------------------------------------
  // Service Accordion
  // ----------------------------------------
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    const header = item.querySelector('.service-item__header');
    
    if (header) {
      header.addEventListener('click', function() {
        // Close other items
        serviceItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
  
  // ----------------------------------------
  // Testimonial Carousel
  // ----------------------------------------
  const testimonials = document.querySelectorAll('.testimonial__slide');
  const prevBtn = document.querySelector('.testimonial__nav--prev');
  const nextBtn = document.querySelector('.testimonial__nav--next');
  let currentIndex = 0;
  
  function showTestimonial(index) {
    testimonials.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }
  
  if (testimonials.length > 0) {
    showTestimonial(0);
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
  }
  
  // ----------------------------------------
  // Smooth Scroll for Anchor Links
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ----------------------------------------
  // Form Validation
  // ----------------------------------------
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = this.querySelector('[name="name"]');
      const email = this.querySelector('[name="email"]');
      let isValid = true;
      
      if (name && name.value.trim() === '') {
        showError(name, 'Veuillez entrer votre nom');
        isValid = false;
      } else if (name) {
        clearError(name);
      }
      
      if (email && !isValidEmail(email.value)) {
        showError(email, 'Veuillez entrer un email valide');
        isValid = false;
      } else if (email) {
        clearError(email);
      }
      
      if (isValid) {
        // Show success message
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message envoyé !';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorEl = formGroup.querySelector('.form-error');
    
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      formGroup.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
    input.style.borderColor = '#c8847a';
  }
  
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorEl = formGroup.querySelector('.form-error');
    
    if (errorEl) {
      errorEl.remove();
    }
    
    input.style.borderColor = '';
  }
  
  // ----------------------------------------
  // Fade In Animation on Scroll
  // ----------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
  
});
