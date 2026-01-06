document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));


    // --- 2. Dynamic Header Logic ---
    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    
    if (header) {
        const headerHeight = header.offsetHeight;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        });
    }


    // --- 3. Typewriter Effect ---
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const titleText = "Simplify Your Business Operations with POPS Restaurant & Retail Software"; 
        let charIndex = 0;
        
        heroTitle.innerHTML = '<span id="typewriter-text"></span><span class="typewriter-cursor"></span>';
        const textContainer = document.getElementById('typewriter-text');
        
        function typeWriter() {
            if (charIndex < titleText.length) {
                textContainer.innerHTML += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50); 
            } else {
                const cursor = heroTitle.querySelector('.typewriter-cursor');
                if (cursor) {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                }
            }
        }
        setTimeout(typeWriter, 500);
    }


    // --- 4. Dynamic Product Slider ---
    const productSlider = document.getElementById('product-slider');
    if (productSlider) {
        const totalItems = productSlider.children.length;
        let currentIndex = 0;

        window.nextProduct = function() {
            // Desktop: Slide 3 items. Mobile: Slide 1 item.
            const itemsPerView = window.innerWidth >= 768 ? 3 : 1;
            const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSlider();
        }

        window.prevProduct = function() {
            const itemsPerView = window.innerWidth >= 768 ? 3 : 1;
            const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Loop to end
            }
            updateSlider();
        }

        function updateSlider() {
            // Translate container by 100% increments (shows next "page" of items)
            productSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Reset on resize to prevent alignment glitches
        window.addEventListener('resize', () => {
             currentIndex = 0;
             updateSlider();
        });
    }
});