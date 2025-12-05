// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Smooth scroll to target
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .news-card, .review-card, .media-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Language Modal (Show on first visit - optional)
const languageModal = document.getElementById('languageModal');

function showLanguageModal() {
    languageModal.style.display = 'flex';
}

function closeLanguageModal() {
    languageModal.style.display = 'none';
}

// Check if user has visited before
if (!localStorage.getItem('languageSelected')) {
    // Uncomment to show language modal on first visit
    // setTimeout(showLanguageModal, 1000);
}

// Language selection
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelector('.btn-choose')?.addEventListener('click', () => {
    localStorage.setItem('languageSelected', 'true');
    closeLanguageModal();
});

// Phone Number Clicks Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone number clicked: ' + link.href);
        // In production, this would send data to analytics
    });
});

// Social Media Clicks Tracking
document.querySelectorAll('.social-card, .social-icon').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.className.split(' ').find(c => 
            ['tiktok', 'youtube', 'facebook', 'instagram'].includes(c)
        );
        console.log('Social media clicked: ' + platform);
        // In production, this would send data to analytics
    });
});

// Form Validation (if forms are added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Floating Button Visibility
const floatingBtn = document.querySelector('.floating-btn');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'all';
    } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
    }
});

// Initial setup
floatingBtn.style.opacity = '0';
floatingBtn.style.transition = 'opacity 0.3s ease';

// Reviews Slider (optional enhancement)
function initReviewsSlider() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    if (!reviewsGrid) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - reviewsGrid.offsetLeft;
        scrollLeft = reviewsGrid.scrollLeft;
        reviewsGrid.style.cursor = 'grabbing';
    });

    reviewsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsGrid.style.cursor = 'grab';
    });

    reviewsGrid.addEventListener('mouseup', () => {
        isDown = false;
        reviewsGrid.style.cursor = 'grab';
    });

    reviewsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsGrid.scrollLeft = scrollLeft - walk;
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize reviews slider if needed
    // initReviewsSlider();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Alert Banner Animation
const alertBanner = document.querySelector('.alert-banner');
if (alertBanner) {
    const alertItems = alertBanner.querySelectorAll('.alert-item');
    alertItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        itemObserver.observe(item);
    });
}

// Service Cards Hover Effect Enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Partners Logo Animation
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach((logo, index) => {
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    logo.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0.7';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.5 });
    
    logoObserver.observe(logo);
});

// Console Welcome Message
console.log('%c¡Bienvenido al sitio web del Abogado Jorge Rivera!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSitio web profesional desarrollado con HTML5, CSS3 y JavaScript', 'color: #6b7280; font-size: 14px;');
console.log('%cTel: 1-888-578-2276', 'color: #dc2626; font-size: 16px; font-weight: bold;');

// Prevent right-click on images (optional - for protecting photos)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment to prevent right-click
        // e.preventDefault();
    });
});

// Back to Top functionality (optional)
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e3a8a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 997;
        box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Uncomment to add back to top button
// addBackToTop();

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // If you want to use lazy loading, add data-src attribute to images instead of src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
