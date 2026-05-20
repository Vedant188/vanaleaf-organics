# Vanaleaf Organics Website

A professional, modern, and interactive e-commerce website for Vanaleaf Organics, featuring their premium Moringa Powder product.

## Features

### Pages
- **Home** - Hero section, features, product highlights, and testimonials
- **Product Details** - Comprehensive product information with size options and add to cart
- **About Us** - Company story, mission, values, and certifications
- **Contact** - Contact form, FAQ section, and contact information

### E-Commerce Functionality
- Shopping cart with persistent storage (localStorage)
- Multiple product size options (100g, 250g, 500g, 1kg)
- Quantity selector
- Cart sidebar with real-time updates
- Full checkout flow with order summary
- Shipping calculation (free shipping over $50)
- Form validation

### Interactive Features
- Responsive navigation with mobile menu
- Smooth scroll animations
- Product tabs (Description, Usage, Ingredients, Reviews)
- Real-time price updates based on size selection
- Add to cart notifications
- Interactive form elements with validation
- Back-to-top button
- Hover effects and transitions throughout

### Design Highlights
- Modern, clean aesthetic with nature-inspired green color scheme
- Fully responsive design (mobile, tablet, desktop)
- Professional typography and spacing
- CSS animations and transitions
- Font Awesome icons
- Consistent branding throughout

## File Structure

```
vanaleaforganics-website/
├── index.html          # Home page
├── product.html        # Product details page
├── about.html          # About us page
├── contact.html        # Contact page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── cart.js        # Shopping cart functionality
│   ├── main.js        # Main JavaScript features
│   ├── product.js     # Product page specific scripts
│   └── contact.js     # Contact form scripts
├── images/            # Placeholder for product images
└── README.md          # This file
```

## How to Use

### Opening the Website
1. Navigate to the `vanaleaforganics-website` folder
2. Open `index.html` in your web browser
3. All pages are linked and fully functional

### Testing E-Commerce Features
1. Go to the **Products** page
2. Select a product size from the dropdown
3. Adjust quantity using +/- buttons
4. Click "Add to Cart"
5. Click the cart icon in the navigation to view your cart
6. Click "Proceed to Checkout" to test the checkout flow
7. Fill in the form (any test data works) and submit

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization Guide

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2d6a4f;    /* Main brand color */
    --secondary-color: #40916c;   /* Secondary brand color */
    --accent-color: #95d5b2;      /* Accent color */
    /* ... more colors ... */
}
```

### Adding Product Images
1. Add your images to the `images/` folder
2. Replace the placeholder divs in the HTML files with:
```html
<img src="images/your-image.jpg" alt="Product name">
```

### Updating Content
- **Company Information**: Edit text in `about.html`
- **Product Details**: Update information in `product.html`
- **Contact Info**: Modify details in `contact.html`
- **Testimonials**: Change reviews in `index.html`

### Adding More Products
1. Duplicate the product structure in `product.html`
2. Update the product details (name, sizes, prices)
3. Add new product entries to the cart system in `js/cart.js`

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome 6.0** - Icons
- **LocalStorage** - Cart persistence

### Key Features Implementation

#### Shopping Cart
- Uses localStorage to persist cart data between sessions
- Object-oriented design with ShoppingCart class
- Real-time updates and notifications

#### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox for layouts
- Breakpoints at 768px and 480px

#### Form Validation
- Real-time email validation
- Card number formatting
- Required field validation

## Future Enhancements

Potential features to add:
- Backend integration for actual payment processing
- Product search functionality
- User accounts and order history
- Product reviews system
- Live chat support
- Email newsletter signup
- Blog section
- Multiple product catalog
- Wishlist functionality
- Social media integration

## Notes

- This is a front-end only website (no backend/database)
- The checkout process simulates order placement
- Cart data is stored locally in the browser
- For production use, integrate with a payment gateway (Stripe, PayPal, etc.)
- Add server-side validation and processing for forms
- Implement proper security measures for production

## Support

For questions or issues:
- Email: info@vanaleaforganics.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ and 🌿 for Vanaleaf Organics**
