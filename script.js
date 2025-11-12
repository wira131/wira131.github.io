document.addEventListener('DOMContentLoaded', () => {

// =========================================================
// 1. Mobile Menu Toggle
// =========================================================

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuButton.addEventListener('click', () => {
        // Toggle 'hidden' class on the mobile menu
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link inside it is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

// =========================================================
// 2. Counter Animation (ตัวเลขวิ่งในส่วนสถิติ/About)
// =========================================================

    const counterSection = document.getElementById('about');
    let hasAnimated = false;

    const animateCount = (element, finalValue) => {
        let startTimestamp = null;
        const duration = 2000; // 2 วินาที

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Calculate current value and update text
            const currentValue = Math.floor(progress * finalValue);
            element.textContent = currentValue;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = finalValue; // Ensure final number is accurate
            }
        };

        window.requestAnimationFrame(step);
    };

    const runCounters = () => {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const finalValue = parseInt(counter.getAttribute('data-count'));
            animateCount(counter, finalValue);
        });
        hasAnimated = true;
    };

    // Use Intersection Observer to trigger the counter when the section comes into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                runCounters();
                observer.unobserve(entry.target); // Stop observing after animation runs once
            }
        });
    }, observerOptions);

    if (counterSection) {
        observer.observe(counterSection);
    }

// =========================================================
// 3. Portfolio Filter (ตัวกรองผลงาน)
// =========================================================

    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active styling for buttons
            filterButtons.forEach(btn => {
                if (btn === button) {
                    btn.classList.add('active', 'bg-primary-600', 'text-white');
                    btn.classList.remove('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
                } else {
                    btn.classList.remove('active', 'bg-primary-600', 'text-white');
                    btn.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
                }
            });

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory.includes(filterValue)) {
                    item.style.display = 'block'; 
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Initialize: Activate the "All" filter on load
    const allButton = document.querySelector('.portfolio-filter[data-filter="all"]');
    if (allButton) {
        // Simulate click on "All" button on page load
        allButton.click(); 
    }
});
