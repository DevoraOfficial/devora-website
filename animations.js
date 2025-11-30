document.addEventListener('DOMContentLoaded', () => {
    // ----- Smooth scrolling -----
    const handleSmoothScroll = e => {
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // ----- Scroll animations -----
    const animatedElements = document.querySelectorAll(
        '.product-card, .soon-card, .section-header, .coming-soon, .block'
    );
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // На мобильных показываем сразу
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }

    // IntersectionObserver для всех элементов
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));

    // ----- Optional: subtle parallax for hero text -----
    const heroText = document.querySelector('.hero h1');
    const heroSubtext = document.querySelector('.hero p');

    if (heroText && heroSubtext) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroText.style.transform = `translateY(${Math.min(scrollY * 0.2, 20)}px)`;
            heroSubtext.style.transform = `translateY(${Math.min(scrollY * 0.1, 15)}px)`;
        });
    }
});

// ----- Modal -----
const modal = document.getElementById("privacy-modal");
const privacyLink = document.querySelector('a[href="#privacy"]');
const closeBtn = modal.querySelector(".close");

// открыть модалку
privacyLink.addEventListener("click", function(e) {
  e.preventDefault();
  modal.style.display = "block";
});

// закрыть модалку
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// закрыть кликом по фону
window.addEventListener("click", function(e) {
  if (e.target === modal) modal.style.display = "none";
});
