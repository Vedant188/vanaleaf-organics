# Quick Start Guide

## How to Open Your Website

### Option 1: Open in Browser (Easiest)
1. Navigate to the `vanaleaforganics-website` folder
2. Double-click `index.html` to open it in your default browser

### Option 2: Using Terminal/Command Line
```bash
cd /Users/vedantraj/Gitrepos/object-store-service/vanaleaforganics-website
open index.html
```

### Option 3: Using a Local Server (Recommended for Development)

**Using Python:**
```bash
cd /Users/vedantraj/Gitrepos/object-store-service/vanaleaforganics-website
python3 -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (npx):**
```bash
cd /Users/vedantraj/Gitrepos/object-store-service/vanaleaforganics-website
npx serve
```

## What You'll See

### Home Page (index.html)
- Beautiful hero section with call-to-action buttons
- Features section highlighting benefits
- Product showcase
- Customer testimonials
- Full navigation menu

### Navigation Menu
- **Home** - Main landing page
- **Products** - Product details and shopping
- **About Us** - Company information
- **Contact** - Contact form and FAQ
- **Cart Icon** - Shopping cart (click to view)

## Test the Shopping Cart

1. Click **Products** in the navigation
2. Select a product size (100g, 250g, 500g, or 1kg)
3. Choose quantity (use +/- buttons)
4. Click **Add to Cart**
5. Click the **shopping cart icon** in the top right
6. Review your cart
7. Click **Proceed to Checkout**
8. Fill in the form with test data
9. Submit to see order confirmation

## Features to Explore

✅ **Responsive Design** - Try resizing your browser window
✅ **Mobile Menu** - Click the hamburger menu on mobile
✅ **Product Tabs** - Switch between Description, Usage, Ingredients, Reviews
✅ **Contact Form** - Send a test message
✅ **Interactive Animations** - Scroll to see smooth animations
✅ **Cart Persistence** - Cart saves even if you close the browser

## Tips

- The cart data is stored in your browser's localStorage
- You can open multiple pages in different tabs
- All pages are fully functional without any backend
- The checkout is simulated (no real payment processing)

## Next Steps

To make this a real e-commerce site:
1. Add actual product images to the `images/` folder
2. Integrate with a payment processor (Stripe, PayPal)
3. Connect to a backend/database
4. Set up email notifications
5. Add SSL certificate for security
6. Deploy to a web hosting service

Enjoy your new website! 🌿
