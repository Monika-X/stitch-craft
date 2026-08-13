// rtl.js
document.addEventListener('DOMContentLoaded', () => {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const currentDir = localStorage.getItem('direction') || 'ltr';

  // Apply initial direction
  document.documentElement.setAttribute('dir', currentDir);
  
  // Set initial text
  if (rtlToggleBtn) {
      rtlToggleBtn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
  }

  // Toggle direction on button click
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('direction', 'ltr');
        rtlToggleBtn.textContent = 'RTL';
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('direction', 'rtl');
        rtlToggleBtn.textContent = 'LTR';
      }
    });
  }
});
