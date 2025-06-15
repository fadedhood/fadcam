/**
 * FadCam Website - Main JavaScript File
 * Author: FadSec Lab
 * Updated: 2024
 */

document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // Initialize Particles.js
    // =====================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#f44336"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e53935",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // =====================
    // Element References
    // =====================
    const header = document.querySelector('header');
    const features = document.querySelectorAll('.feature');
    const slider = document.querySelector('.screenshots');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const faqItems = document.querySelectorAll('.faq-item');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const screenshotModal = document.getElementById('screenshotModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const screenshotImages = document.querySelectorAll('.screenshots img');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // =====================
    // Scroll to Top Button
    // =====================
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =====================
    // Screenshot Modal
    // =====================
    screenshotImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            screenshotModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close modal with close button
    closeModal.addEventListener('click', () => {
        screenshotModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside of the image
    screenshotModal.addEventListener('click', (e) => {
        if (e.target === screenshotModal) {
            screenshotModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && screenshotModal.classList.contains('active')) {
            screenshotModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // =====================
    // Mobile Menu
    // =====================
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // =====================
    // Header Scroll Effect
    // =====================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.querySelector('.topbar').classList.add('shrink');
        } else {
            header.querySelector('.topbar').classList.remove('shrink');
        }
    });

    // =====================
    // Smooth Scrolling
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000;
                let start = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                }
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const time = Math.min(1, progress / duration);
                    const position = startPosition + distance * easeInOutCubic(time);
                    
                    window.scrollTo(0, position);
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });

    // =====================
    // 3D Effect for Features
    // =====================
    features.forEach(feature => {
        feature.addEventListener('mousemove', (e) => {
            const rect = feature.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 7;
            const rotateY = (centerX - x) / 7;

            feature.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            feature.style.transition = 'transform 0.5s ease';
        });
        
        feature.addEventListener('mouseenter', () => {
            feature.style.transition = 'transform 0.1s ease';
        });
    });

    // =====================
    // Screenshots Slider
    // =====================
    const scrollAmount = 300; // Amount to scroll by

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Show/hide arrows based on scroll position
    slider.addEventListener('scroll', () => {
        prevBtn.style.display = slider.scrollLeft > 0 ? 'flex' : 'none';
        nextBtn.style.display = 
            (slider.scrollWidth - slider.clientWidth - slider.scrollLeft > 1) ? 'flex' : 'none';
    });

    // Initialize arrow visibility
    prevBtn.style.display = 'none';
    nextBtn.style.display = 
        (slider.scrollWidth > slider.clientWidth) ? 'flex' : 'none';

    // =====================
    // Statistics Counter
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        countersStarted = true;
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const isDecimal = target % 1 !== 0;
            const duration = 2000; // 2 seconds animation
            const frameRate = 1000 / 60; // 60fps
            const totalFrames = Math.floor(duration / frameRate);
            let frame = 0;
            
            const startValue = 0;
            const countInterval = setInterval(() => {
                frame++;
                const progress = Math.min(frame / totalFrames, 1);
                const currentValue = startValue + (target - startValue) * easeOutQuad(progress);
                
                if (isDecimal) {
                    stat.textContent = Math.max(0, currentValue).toFixed(1);
                } else {
                    stat.textContent = Math.max(0, Math.floor(currentValue));
                }
                
                if (frame >= totalFrames) {
                    clearInterval(countInterval);
                    stat.textContent = isDecimal ? target.toFixed(1) : target;
                }
            }, frameRate);
        });
    }
    
    // Easing function for smoother animation
    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }
    
    // Start counters when stats section comes into view
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        window.addEventListener('scroll', () => {
            const statsPosition = statsContainer.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (statsPosition < screenPosition - 100) {
                startCounters();
            }
        });
    }

    // =====================
    // FAQ Accordion
    // =====================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ item
            item.classList.toggle('active');
        });
    });
});