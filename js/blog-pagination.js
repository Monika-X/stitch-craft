document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.blog-category-link');
    const blogItems = document.querySelectorAll('.blog-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let currentCategory = 'all';
    let visibleCount = 9; // Show first 9 by default

    // Initialize: assign categories based on text if they don't have them
    blogItems.forEach(item => {
        if (!item.hasAttribute('data-category')) {
            const text = item.textContent.toLowerCase();
            if (text.includes('wedding') || text.includes('groom') || text.includes('tuxedo')) {
                item.setAttribute('data-category', 'wedding');
            } else if (text.includes('trend') || text.includes('fashion') || text.includes('color')) {
                item.setAttribute('data-category', 'latest-trends');
            } else if (text.includes('atelier') || text.includes('process') || text.includes('craftsmanship')) {
                item.setAttribute('data-category', 'inside-the-atelier');
            } else {
                item.setAttribute('data-category', 'tailoring-guide');
            }
        }
    });

    function applyFilterAndPagination() {
        let count = 0;
        let totalVisibleInCategory = 0;

        blogItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            // First determine if it matches the current category
            if (currentCategory === 'all' || itemCategory === currentCategory) {
                totalVisibleInCategory++;
                
                // Then apply pagination (only show up to visibleCount)
                if (count < visibleCount) {
                    item.style.display = '';
                    // We remove hidden-card if it was applied originally
                    item.classList.remove('hidden-card'); 
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                    count++;
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });

        // Hide load more button if all items in category are shown
        if (loadMoreBtn) {
            if (count >= totalVisibleInCategory) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }

    // Set up filter click events
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Get category
            const text = link.textContent.trim().toLowerCase();
            if (text === 'all stories') currentCategory = 'all';
            else if (text === 'tailoring guide') currentCategory = 'tailoring-guide';
            else if (text === 'latest trends') currentCategory = 'latest-trends';
            else if (text === 'wedding') currentCategory = 'wedding';
            else if (text === 'inside the atelier') currentCategory = 'inside-the-atelier';
            
            // Reset pagination on category change
            visibleCount = 9;
            applyFilterAndPagination();
        });
    });

    // Set up load more click event
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 9;
            applyFilterAndPagination();
        });
    }

    // Initial render
    blogItems.forEach(item => {
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    applyFilterAndPagination();
});
