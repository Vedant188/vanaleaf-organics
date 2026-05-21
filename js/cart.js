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
            cartTotalElement.textContent = '₹0';
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
            });
        }

        // WhatsApp order button
        const whatsappBtn = document.getElementById('orderWhatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                this.orderViaWhatsApp();
            });
        }

        // COD/UPI button
        const codBtn = document.getElementById('orderCodBtn');
        if (codBtn) {
            codBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                this.orderViaWhatsApp(true);
            });
        }
    }

    orderViaWhatsApp(isCod = false) {
        const subtotal = this.getTotal();
        const shipping = subtotal >= 4000 ? 0 : 100;
        const total = subtotal + shipping;

        let message = `Namaste! I'd like to place an order from Vanaleaf Organics:\n\n`;

        this.items.forEach(item => {
            const itemTotal = Math.round(item.price * item.quantity);
            message += `• ${item.name} (${item.size}) × ${item.quantity} — ₹${itemTotal.toLocaleString('en-IN')}\n`;
        });

        message += `\nSubtotal: ₹${Math.round(subtotal).toLocaleString('en-IN')}`;
        message += `\nShipping: ${shipping === 0 ? 'FREE' : '₹' + shipping}`;
        message += `\nTotal: ₹${Math.round(total).toLocaleString('en-IN')}`;

        if (isCod) {
            message += `\n\nI'd prefer COD / UPI payment.`;
        }

        message += `\n\nPlease confirm availability and payment details. 🌿`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/916299903014?text=${encoded}`, '_blank');
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
