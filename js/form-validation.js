// form-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Name Validation
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your full name.';
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
        }

        // Email Validation
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email address.';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
        }

        // Subject Validation
        const subjectInput = document.getElementById('subject');
        const subjectError = document.getElementById('subjectError');
        if (!subjectInput.value.trim()) {
            subjectError.textContent = 'Please enter a subject.';
            subjectInput.classList.add('error');
            isValid = false;
        } else {
            subjectError.textContent = '';
            subjectInput.classList.remove('error');
        }

        // Message Validation
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter your message.';
            messageInput.classList.add('error');
            isValid = false;
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('error');
        }

        if (isValid) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            formSuccess.classList.add('visible');
        }
    });

    // Remove error styles on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorSpan = document.getElementById(this.id + 'Error');
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        });
    });
});
