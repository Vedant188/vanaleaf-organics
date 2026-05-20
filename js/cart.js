// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartCount();
        this.renderCart();
        this.attachEventListeners();
    }

    loadCart() {
        const cart = localStorage.getItem('vanaleafCart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('vanaleafCart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item =>
            item.name === product.name && item.size === product.size
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Product added to cart!');
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">${item.size} × ${item.quantity}</div>
                    <div class="cart-item-price">₹${Math.round(item.price * item.quantity)}</div>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        cartTotalElement.textContent = `₹${Math.round(this.getTotal())}`;
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #2d6a4f;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i> ${message}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    attachEventListeners() {
        // Toggle cart sidebar
        const cartToggle = document.getElementById('cartToggle');
        const closeCart = document.getElementById('closeCart');
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('overlay');

        if (cartToggle) {
            cartToggle.addEventListener('click', (e) => {
                e.preventDefault();
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
            });
        }

        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
                const modal = document.getElementById('checkoutModal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                this.openCheckoutModal();
            });
        }
    }

    openCheckoutModal() {
        const modal = document.getElementById('checkoutModal');
        const overlay = document.getElementById('overlay');

        if (modal) {
            modal.classList.add('active');
            overlay.classList.add('active');
            this.renderOrderSummary();
        }

        // Close modal handlers
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        // Form submission
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processOrder();
            });
        }
    }

    renderOrderSummary() {
        const orderItemsContainer = document.getElementById('orderItems');
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const finalTotalElement = document.getElementById('finalTotal');

        if (!orderItemsContainer) return;

        orderItemsContainer.innerHTML = this.items.map(item => `
            <div class="order-item">
                <span>${item.name} (${item.size}) × ${item.quantity}</span>
                <span>₹${Math.round(item.price * item.quantity)}</span>
            </div>
        `).join('');

        const subtotal = this.getTotal();
        const shipping = subtotal >= 4000 ? 0 : 100;
        const total = subtotal + shipping;

        subtotalElement.textContent = `₹${Math.round(subtotal)}`;
        shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
        finalTotalElement.textContent = `₹${Math.round(total)}`;
    }

    processOrder() {
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zipCode: document.getElementById('zipCode').value,
            items: this.items,
            total: this.getTotal() + (this.getTotal() >= 4000 ? 0 : 100)
        };

        // In a real application, you would send this to a server
        console.log('Order submitted:', formData);

        // Show success message
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase. We've sent a confirmation email to ${formData.email}</p>
                <p>Order Total: ₹${Math.round(formData.total)}</p>
                <button class="btn btn-primary" onclick="location.reload()">Continue Shopping</button>
            </div>
        `;

        // Clear cart
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
