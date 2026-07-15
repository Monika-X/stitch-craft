// navbar.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Hamburger Menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // User Dropdown Toggle
  const userBtn = document.querySelector('.user-btn');
  const userDropdown = document.querySelector('.user-dropdown');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });

    // Close dropdown when a dropdown link is clicked
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        userDropdown.classList.remove('active');
      });
    });
  }

  // Handle BFCache (Back/Forward Cache) so dropdown doesn't stay open when returning
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && userDropdown) {
      userDropdown.classList.remove('active');
    }
    if (event.persisted && hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
  });

  // Highlight Active Link
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });
});
