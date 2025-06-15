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
    const screenshotImages = document.querySelectorAll('.screenshot-img');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // =====================
    // Statistics Counter
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    // Start counters with a small delay to ensure DOM is ready
    setTimeout(() => {
        startCounters();
    }, 500);
    
    function startCounters() {
        if (countersStarted) return;
        
        countersStarted = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2500; // 2.5 seconds animation
            const frameRate = 1000 / 60; // 60fps
            const totalFrames = Math.floor(duration / frameRate);
            let frame = 0;
            
            const startValue = 0;
            const countInterval = setInterval(() => {
                frame++;
                const progress = Math.min(frame / totalFrames, 1);
                const currentValue = startValue + (target - startValue) * easeOutQuad(progress);
                
                // Format large numbers with commas
                const formattedNumber = Math.max(0, Math.floor(currentValue)).toLocaleString();
                stat.textContent = formattedNumber;
                
                if (frame >= totalFrames) {
                    clearInterval(countInterval);
                    stat.textContent = target.toLocaleString();
                }
            }, frameRate);
        });
    }
    
    // Ensure counters start when scrolled into view as well
    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                startCounters();
            }
        }
    });

    // Easing function for smoother animation
    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }

    // =====================
    // Screenshot Modal
    // =====================
    let currentImageIndex = 0;
    const allImages = Array.from(screenshotImages);
    
    // Create modal navigation arrows
    const modalPrev = document.createElement('div');
    modalPrev.className = 'modal-arrow modal-prev';
    modalPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const modalNext = document.createElement('div');
    modalNext.className = 'modal-arrow modal-next';
    modalNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Add arrows to modal
    screenshotModal.appendChild(modalPrev);
    screenshotModal.appendChild(modalNext);
    
    // Add click events for all screenshot images
    screenshotImages.forEach((img, index) => {
        img.onclick = function() {
            currentImageIndex = index;
            modalImage.src = this.src;
            
            // Show modal first with display flex
            screenshotModal.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            // Force reflow to ensure transition works
            void screenshotModal.offsetWidth;
            
            // Then add active class for animation
            screenshotModal.classList.add('active');
            
            // Animate the image in
            setTimeout(() => {
                modalImage.style.opacity = "1";
                modalImage.style.transform = "scale(1)";
            }, 10);
        };
    });
    
    // Close modal on X click
    closeModal.onclick = function(e) {
        e.stopPropagation();
        
        // First remove active class
        screenshotModal.classList.remove('active');
        modalImage.style.opacity = "0";
        modalImage.style.transform = "scale(0.9)";
        
        // Then hide after animation completes
        setTimeout(() => {
            screenshotModal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    };
    
    // Close modal on outside click
    screenshotModal.onclick = function(e) {
        if (e.target === screenshotModal) {
            closeModal.onclick(e);
        }
    };
    
    // Navigate to previous image
    modalPrev.onclick = function(e) {
        e.stopPropagation();
        navigateImage(-1);
    };
    
    // Navigate to next image
    modalNext.onclick = function(e) {
        e.stopPropagation();
        navigateImage(1);
    };
    
    // Common navigation function
    function navigateImage(direction) {
        // Fade out current image
        modalImage.style.opacity = "0";
        modalImage.style.transform = "scale(0.9)";
        
        setTimeout(() => {
            // Update index
            currentImageIndex = (currentImageIndex + direction + allImages.length) % allImages.length;
            
            // Change source
            modalImage.src = allImages[currentImageIndex].src;
            
            // Fade in new image
            setTimeout(() => {
                modalImage.style.opacity = "1";
                modalImage.style.transform = "scale(1)";
            }, 50);
        }, 200);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (screenshotModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal.onclick(e);
            } else if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
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
});