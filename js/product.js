// Product Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Price update based on size selection
    const sizeSelect = document.getElementById('size');
    const priceDisplay = document.getElementById('productPrice');

    if (sizeSelect && priceDisplay) {
        sizeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const priceText = selectedOption.textContent.split(' - ')[1];
            priceDisplay.textContent = priceText;
        });
    }

    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const increaseBtn = document.getElementById('increaseQty');
    const decreaseBtn = document.getElementById('decreaseQty');

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    // Add to cart functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const sizeSelect = document.getElementById('size');
            const quantityInput = document.getElementById('quantity');

            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            const size = selectedOption.value;
            const price = parseFloat(selectedOption.getAttribute('data-price'));
            const quantity = parseInt(quantityInput.value);

            const product = {
                name: 'Premium Organic Moringa Powder',
                size: size,
                price: price,
                quantity: quantity
            };

            // Add to cart using the cart object from cart.js
            if (typeof cart !== 'undefined') {
                cart.addItem(product);

                // Visual feedback
                addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
                addToCartBtn.style.backgroundColor = '#40916c';

                setTimeout(() => {
                    addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    addToCartBtn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Product tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const activePanel = document.getElementById(tabName);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // Image gallery (if you add multiple images later)
    function initImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-image img');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-full');
                if (mainImage && newSrc) {
                    mainImage.src = newSrc;

                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    // Zoom on hover for main image
    const mainImageContainer = document.querySelector('.main-image');
    if (mainImageContainer) {
        mainImageContainer.addEventListener('mouseenter', function() {
            this.style.cursor = 'zoom-in';
        });
    }

    // Star rating interaction (for future review form)
    function initStarRating() {
        const stars = document.querySelectorAll('.rating-input .star');

        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // Quick view animation
    const productInfoSection = document.querySelector('.product-info-section');
    if (productInfoSection) {
        productInfoSection.style.opacity = '0';
        productInfoSection.style.transform = 'translateY(20px)';
        productInfoSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            productInfoSection.style.opacity = '1';
            productInfoSection.style.transform = 'translateY(0)';
        }, 200);
    }

    // Sticky add to cart on scroll (mobile enhancement)
    function createStickyAddToCart() {
        if (window.innerWidth <= 768) {
            const addToCartBtn = document.getElementById('addToCartBtn');
            if (!addToCartBtn) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        addToCartBtn.style.position = 'fixed';
                        addToCartBtn.style.bottom = '20px';
                        addToCartBtn.style.left = '20px';
                        addToCartBtn.style.right = '20px';
                        addToCartBtn.style.zIndex = '1000';
                    } else {
                        addToCartBtn.style.position = '';
                        addToCartBtn.style.bottom = '';
                        addToCartBtn.style.left = '';
                        addToCartBtn.style.right = '';
                    }
                });
            }, { threshold: 0 });

            observer.observe(addToCartBtn);
        }
    }

    createStickyAddToCart();

    // Product benefits animation
    const benefitItems = document.querySelectorAll('.product-benefits ul li');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });

    // Scroll to reviews from rating
    const ratingCount = document.querySelector('.rating-count');
    if (ratingCount) {
        ratingCount.style.cursor = 'pointer';
        ratingCount.addEventListener('click', function() {
            const reviewsTab = document.querySelector('[data-tab="reviews"]');
            const productTabs = document.querySelector('.product-tabs');

            if (reviewsTab && productTabs) {
                productTabs.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    reviewsTab.click();
                }, 500);
            }
        });
    }
});

// Product recommendations (placeholder for future enhancement)
function loadProductRecommendations() {
    // This would typically fetch related products from a server
    console.log('Loading product recommendations...');
}

// Notify when back in stock (placeholder for future enhancement)
function notifyWhenAvailable() {
    const email = prompt('Enter your email to be notified when this product is back in stock:');
    if (email && validateEmail(email)) {
        alert('Thank you! We\'ll notify you when this product is back in stock.');
        // In a real app, this would send the email to a server
    }
}

// Size guide modal (placeholder for future enhancement)
function showSizeGuide() {
    alert('Size Guide:\n\n100g - Perfect for trying moringa for the first time\n250g - 1 month supply for daily use\n500g - 2-3 month supply\n1kg - Best value for regular users');
}
