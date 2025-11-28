// Scroll animations with mobile detection
function initAnimations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Skip animations on mobile for better performance
        document.querySelectorAll('.product-card, .soon-card').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.product-card, .soon-card, .section-header, .coming-soon');
    animatedElements.forEach(el => observer.observe(el));
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', initAnimations);

// Re-initialize on window resize (if needed)
window.addEventListener('resize', initAnimations);