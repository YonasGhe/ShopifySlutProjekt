document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // Account Icon Enhancement
    // ========================================
    const header = document.querySelector('.header');

    if (header) {
        const accountIcon = document.createElement('div');
        accountIcon.classList.add('header__icon', 'header__icon--profile', 'link', 'focus-inset');
        accountIcon.setAttribute('role', 'button');
        accountIcon.setAttribute('tabindex', '0');
        accountIcon.setAttribute('aria-label', 'Account');

        accountIcon.innerHTML = `
            <img src="https://cdn.shopify.com/s/files/1/0694/3732/5533/files/user.png?v=1712920812" 
                 alt="Account" 
                 class="header__icon-img">
            <span class="header__icon-text">Account</span>
        `;

        header.insertBefore(accountIcon, header.firstChild);

        accountIcon.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '/account/login';
        });

        // Keyboard accessibility
        accountIcon.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '/account/login';
            }
        });
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.header__mobile-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Search Bar Toggle (for mobile)
    // ========================================
    const searchToggle = document.querySelector('.header__search-icon');
    const searchOverlay = document.querySelector('.header__search-overlay');
    const searchInput = document.querySelector('.header__search-input');

    if (searchToggle && searchOverlay && searchInput) {
        searchToggle.addEventListener('click', function () {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });

        searchOverlay.addEventListener('click', function () {
            searchOverlay.classList.remove('active');
        });

        // Close search on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // ========================================
    // Sticky Header on Scroll
    // ========================================
    let lastScroll = 0;
    const headerElement = document.querySelector('.header');

    if (headerElement) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                headerElement.classList.add('header--sticky');

                // Hide on scroll down, show on scroll up
                if (currentScroll > lastScroll && currentScroll > 200) {
                    headerElement.style.transform = 'translateY(-100%)';
                } else {
                    headerElement.style.transform = 'translateY(0)';
                }
            } else {
                headerElement.classList.remove('header--sticky');
                headerElement.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // Product Card Enhancements
    // ========================================
    const productCards = document.querySelectorAll('.card');

    productCards.forEach(card => {
        // Add quick view button
        const quickViewBtn = document.createElement('div');
        quickViewBtn.classList.add('card__actions');
        quickViewBtn.innerHTML = `
            <button class="btn btn--secondary btn--small">Quick View</button>
        `;

        card.appendChild(quickViewBtn);

        // Quick view click handler
        quickViewBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const productLink = card.querySelector('.card__link');
            if (productLink) {
                // You can implement a modal here
                console.log('Quick view for:', productLink.href);
                alert('Quick view coming soon!');
            }
        });

        // Add to cart animation
        const addToCartBtn = card.querySelector('.button--secondary, [type="submit"]');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function (e) {
                e.preventDefault();

                // Animate button
                this.classList.add('btn--loading');
                this.innerHTML = 'Adding...';

                // Simulate AJAX request
                setTimeout(() => {
                    this.classList.remove('btn--loading');
                    this.innerHTML = 'Added!';

                    setTimeout(() => {
                        this.innerHTML = 'Add to cart';
                    }, 1000);

                    // Update cart count (if you have one)
                    updateCartCount();
                }, 500);
            });
        }
    });

    // ========================================
    // Cart Count Function
    // ========================================
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
        }
    }

    // ========================================
    // Newsletter Form Submission
    // ========================================
    const newsletterForm = document.querySelector('.footer-newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;

            // Animate button
            button.textContent = 'Subscribing...';
            button.disabled = true;

            // Simulate AJAX request
            setTimeout(() => {
                button.textContent = 'Subscribed!';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    this.reset();

                    // Show success message
                    alert('Thanks for subscribing!');
                }, 1000);
            }, 500);
        });
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ========================================
    // Product Filter Animation (if you have filters)
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-sidebar button, .filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');

            // Animate product cards
            productCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `fadeIn 0.3s ease forwards ${index * 0.05}s`;
            });
        });
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.createElement('button');
    backToTop.classList.add('back-to-top');
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});