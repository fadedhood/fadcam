document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const features = document.querySelectorAll('.feature');
    const slider = document.querySelector('.screenshots');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const faqItems = document.querySelectorAll('.faq-item');


    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.querySelector('.topbar').classList.add('shrink');
        } else {
            header.querySelector('.topbar').classList.remove('shrink');
        }
    });
    

    
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3D effect for feature cards
    features.forEach(feature => {
        feature.addEventListener('mousemove', (e) => {
            const rect = feature.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            feature.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Screenshots slider functionality
    let slideIndex = 0;
    const slideWidth = 220; // Width of each slide including gap
    const maxSlides = slider.children.length - Math.floor(slider.clientWidth / slideWidth);

    function moveSlider(direction) {
        if (direction === 'next' && slideIndex < maxSlides) {
            slideIndex++;
        } else if (direction === 'prev' && slideIndex > 0) {
            slideIndex--;
        }
        slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        updateArrowVisibility();
    }

    function updateArrowVisibility() {
        prevBtn.style.display = slideIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = slideIndex < maxSlides ? 'block' : 'none';
    }

    prevBtn.addEventListener('click', () => moveSlider('prev'));
    nextBtn.addEventListener('click', () => moveSlider('next'));

    updateArrowVisibility();

    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });

            // Toggle the clicked FAQ item
            item.classList.toggle('active');
            
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
});