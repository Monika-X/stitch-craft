// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Page Loader
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // Simulate loading time
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 0px 0px', threshold: 0.05 });
  
  revealElements.forEach(el => revealObserver.observe(el));
});

// CTA Booking Form Submission (AJAX)
document.addEventListener('DOMContentLoaded', () => {
  const ctaForm = document.getElementById('cta-booking-form');
  const ctaSuccessMsg = document.getElementById('cta-success-msg');

  if (ctaForm && ctaSuccessMsg) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page refresh
      
      // Clear the input field
      const input = ctaForm.querySelector('input[type="email"]');
      if (input) input.value = '';
      
      // Show success message
      ctaSuccessMsg.style.display = 'flex';
      // Slight delay to allow display:flex to apply before animating opacity
      setTimeout(() => {
        ctaSuccessMsg.classList.add('show');
      }, 10);
      
      // Optionally hide it after a few seconds
      setTimeout(() => {
        ctaSuccessMsg.classList.remove('show');
        setTimeout(() => {
          ctaSuccessMsg.style.display = 'none';
        }, 500); // Wait for transition
      }, 5000);
    });
  }
});
