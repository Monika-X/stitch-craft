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

// Global Form AJAX Handler
document.addEventListener('submit', (e) => {
  const form = e.target;
  
  // Exclude forms that specifically need traditional submission (like login/signup)
  if (form.classList.contains('auth-form') || form.closest('.auth-container') || form.hasAttribute('data-no-ajax')) {
    return; 
  }

  // If another script (like form-validation.js) already prevented default, let it handle its own logic
  if (e.defaultPrevented) return;

  e.preventDefault();

  // Find or create feedback container
  let feedback = form.nextElementSibling;
  if (!feedback || !feedback.classList.contains('form-feedback')) {
     feedback = form.querySelector('.form-feedback');
     if (!feedback) {
         feedback = document.createElement('div');
         feedback.className = 'form-feedback';
         form.parentNode.insertBefore(feedback, form.nextSibling);
     }
  }

  // Simulate network request loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
  
  if (submitBtn) {
      submitBtn.innerHTML = '<span style="opacity: 0.5; letter-spacing: 2px;">SENDING...</span>';
      submitBtn.disabled = true;
  }

  setTimeout(() => {
      // Restore button
      if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
      }
      
      // Clear input fields
      const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="button"]), textarea');
      inputs.forEach(input => input.value = '');

      // Show success feedback
      feedback.textContent = 'Thank you. Your request has been successfully processed.';
      feedback.classList.remove('error');
      feedback.classList.add('success');
      
      // Auto-hide feedback after a delay
      setTimeout(() => {
          feedback.classList.remove('success');
      }, 5000);
      
  }, 1000);
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
