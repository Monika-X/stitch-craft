// auth-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Setup Password Toggles
    function setupPasswordToggle(btnId, inputId) {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        if (btn && input) {
            btn.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                if (type === 'text') {
                    btn.innerHTML = '<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
                } else {
                    btn.innerHTML = '<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                }
            });
        }
    }

    setupPasswordToggle('togglePassword', 'password');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    function validateInput(input, errorElement, validationFn, errorMsg) {
        if (!input) return true;
        if (!validationFn(input.value)) {
            errorElement.textContent = errorMsg;
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    }

    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const passwordInput = document.getElementById('password');
            const passwordError = document.getElementById('passwordError');
            
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
            
            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Please enter your password.';
                passwordInput.classList.add('error');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters.';
                passwordInput.classList.add('error');
                isValid = false;
            } else {
                passwordError.textContent = '';
                passwordInput.classList.remove('error');
            }
            
            if (isValid) {
                const btn = loginForm.querySelector('.btn-primary');
                btn.textContent = 'Logging in...';
                btn.style.opacity = '0.7';
                btn.disabled = true;
                setTimeout(() => window.location.href = '../index.html', 1500);
            }
        });
    }

    // Signup Form Validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (!validateInput(nameInput, nameError, val => val.trim().length > 0, 'Please enter your full name.')) isValid = false;
            
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
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
            
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            if (!validateInput(phoneInput, phoneError, val => val.trim().length > 0, 'Please enter your phone number.')) isValid = false;
            
            const passwordInput = document.getElementById('password');
            const passwordError = document.getElementById('passwordError');
            if (!validateInput(passwordInput, passwordError, val => val.length >= 6, 'Password must be at least 6 characters.')) isValid = false;
            
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            if (!validateInput(confirmPasswordInput, confirmPasswordError, val => val === passwordInput.value && val.length >= 6, 'Passwords do not match.')) isValid = false;
            
            const termsCheckbox = document.getElementById('terms');
            const termsError = document.getElementById('termsError');
            if (!termsCheckbox.checked) {
                termsError.textContent = 'You must agree to the Terms & Conditions.';
                isValid = false;
            } else {
                termsError.textContent = '';
            }
            
            if (isValid) {
                const btn = signupForm.querySelector('.btn-primary');
                btn.textContent = 'Creating Account...';
                btn.style.opacity = '0.7';
                btn.disabled = true;
                setTimeout(() => window.location.href = '../index.html', 1500);
            }
        });
    }

    // Remove error styles on input for both forms
    const forms = [loginForm, signupForm].filter(Boolean);
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
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
});
