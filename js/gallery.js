// gallery.js — StitchCraft Gallery Lightbox & Filter

document.addEventListener('DOMContentLoaded', () => {

    // ─── LIGHTBOX ───────────────────────────────────────────
    const lightbox   = document.getElementById('gal-lightbox');
    const lbImg      = document.getElementById('lb-img');
    const lbCaption  = document.getElementById('lb-caption');
    const lbCounter  = document.getElementById('lb-counter');
    const lbClose    = document.getElementById('lb-close');
    const lbPrev     = document.getElementById('lb-prev');
    const lbNext     = document.getElementById('lb-next');
    const lbBackdrop = document.getElementById('lb-backdrop');

    let activeItems = [];
    let currentIndex = 0;

    function openLightbox(items, index) {
        activeItems = items;
        currentIndex = index;
        showSlide(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 350);
    }

    function showSlide(index) {
        const item = activeItems[index];
        if (!item) return;
        lbImg.style.opacity = '0';
        lbImg.src = item.getAttribute('data-src');
        lbCaption.textContent = item.getAttribute('data-caption') || '';
        lbCounter.textContent = (index + 1) + ' / ' + activeItems.length;
        lbImg.onload = () => { lbImg.style.opacity = '1'; };
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % activeItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
        showSlide(currentIndex);
    }

    // ─── BIND CLICK ON ALL ITEMS ────────────────────────────
    function bindClicks() {
        const all = document.querySelectorAll('[data-src]');
        all.forEach((item) => {
            item.addEventListener('click', () => {
                // Collect only currently visible items
                const visible = [...all].filter(i => i.style.display !== 'none');
                const idx = visible.indexOf(item);
                openLightbox(visible, idx >= 0 ? idx : 0);
            });
        });
    }

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    lbNext.addEventListener('click', nextSlide);
    lbPrev.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowRight')  nextSlide();
        if (e.key === 'ArrowLeft')   prevSlide();
    });

    // Touch swipe
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    });

    bindClicks();

    // ─── FILTER TABS ────────────────────────────────────────
    const tabs = document.querySelectorAll('.gal-tab');
    const allGalleryItems = document.querySelectorAll('.gal-item, .gal-insta-item');
    const allGallerySections = document.querySelectorAll('.gal-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            allGalleryItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                const match = (filter === 'all') || (cat === filter);

                if (match) {
                    item.style.display = '';
                    item.setAttribute('data-visible', 'true');
                    // Small delay so display change renders before transition
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    item.setAttribute('data-visible', 'false');
                    setTimeout(() => {
                        if (item.getAttribute('data-visible') === 'false') {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });

            // Hide sections that have no visible items after transition
            setTimeout(() => {
                allGallerySections.forEach(sec => {
                    const itemsInSection = sec.querySelectorAll('.gal-item, .gal-insta-item');
                    if (itemsInSection.length === 0) return; // Skip if no items
                    
                    let hasVisible = false;
                    itemsInSection.forEach(item => {
                        if (item.getAttribute('data-visible') === 'true') {
                            hasVisible = true;
                        }
                    });
                    
                    if (hasVisible || filter === 'all') {
                        sec.style.display = '';
                    } else {
                        sec.style.display = 'none';
                    }
                });
            }, 320);
        });
    });

});
