// Enhanced product data with more details
const products = [
    {
        id: 1,
        name: "Premium Laptop Pro",
        price: 129999.99,  // KSH 29,999.99
        image: "./images/premium laptop.jpg",  // Local image
        category: "Electronics",
        rating: 4.5,
        description: "Ultra-thin professional laptop with premium features"
    },
    {
        id: 2,
        name: "Wireless Noise-Canceling Headphones",
        price: 24999.99,   // KSH 1,999.99
        image: "./images/wireless headphones.jpg",  // Local image
        category: "Electronics",
        rating: 4.8,
        description: "Premium sound quality with active noise cancellation"
    },
    {
        id: 3,
        name: "Smart Fitness Watch",
        price: 19999.99,   // KSH 2,999.99
        image: "./images/smart watch.jpg",  // Local image
        category: "Electronics",
        rating: 4.3,
        description: "Track your fitness goals with style"
    },
    {
        id: 4,
        name: "Professional Camera Kit",
        price: 89999.99,   // KSH 89,999.99
        image: "./images/professional camera.jpg",  // Local image
        category: "Electronics",
        rating: 4.7,
        description: "Capture life's moments in stunning detail"
    }
];

let cart = [];
let currentFilter = 'All';

// Display products with enhanced card design
function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';

    const filteredProducts = currentFilter === 'All' 
        ? products 
        : products.filter(product => product.category === currentFilter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">
                    ${generateRatingStars(product.rating)}
                </div>
                <p class="description">${product.description}</p>
                <p class="price">KSH ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        productsDiv.appendChild(productCard);
    });
}

// Generate rating stars
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    return starsHTML;
}

// Enhanced add to cart animation
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Show notification
    showNotification('Product added to cart!');
    
    updateCartCount();
    updateCartDisplay();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Enhanced cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const finalAmount = document.getElementById('finalAmount');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="continue-shopping" onclick="closeCart()">Continue Shopping</button>
            </div>
        `;
        document.getElementById('totalAmount').textContent = '0.00';
        finalAmount.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="item-price">KSH ${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity-controls">
                    <button onclick="decrementQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="incrementQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 10000 ? 0 : 500; // Free shipping over KSH 10,000
    const total = subtotal + shipping;

    document.getElementById('totalAmount').textContent = subtotal.toFixed(2);
    document.getElementById('shippingAmount').textContent = shipping.toFixed(2);
    finalAmount.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Update total
function updateTotal() {
    const totalAmount = document.getElementById('totalAmount');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toFixed(2);
}

// Toggle cart modal
document.querySelector('.cart').addEventListener('click', () => {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// Close cart modal when clicking outside
document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        document.getElementById('cartModal').style.display = 'none';
    }
});

// Add smooth scroll for Shop Now button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.products-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navItems = document.getElementById('navItems');

menuToggle.addEventListener('click', () => {
    navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-items') && !e.target.closest('.menu-toggle')) {
        navItems.style.display = 'none';
    }
});

// Close menu when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navItems.style.display = 'flex';
    } else {
        navItems.style.display = 'none';
    }
});

// Initialize the page
displayProducts();

// Increment quantity
function incrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateCartCount();
    }
}

// Decrement quantity
function decrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        updateCartDisplay();
        updateCartCount();
    }
}

// Close cart
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    console.log('Showing notification:', message, type); // Debug log

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon;
    switch(type) {
        case 'error':
            icon = 'fa-exclamation-circle';
            break;
        case 'info':
            icon = 'fa-info-circle';
            break;
        case 'success':
        default:
            icon = 'fa-check-circle';
    }

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => {
        if (notif !== notification) {
            notif.remove();
        }
    });

    // Remove after delay
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Add checkout function
function checkout() {
    console.log('Checkout function called'); // Debug log

    if (cart.length === 0) {
        console.log('Cart is empty'); // Debug log
        showNotification('Your cart is empty!', 'error');
        return;
    }

    console.log('Processing checkout...'); // Debug log

    // Calculate final amounts
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 10000 ? 0 : 500;
    const total = subtotal + shipping;

    // Show processing message
    showNotification('Processing your order...', 'info');

    // Add loading state to button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate processing time
    setTimeout(() => {
        // Clear the cart
        cart = [];
        updateCartCount();
        updateCartDisplay();

        // Close the cart modal
        closeCart();

        // Show success message
        showNotification('Order placed successfully! Thank you for shopping with us.', 'success');

        // Reset button state
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = '<i class="fas fa-lock"></i> Secure Checkout';
    }, 2000);
}

// Make sure CartStorage is defined
const CartStorage = {
    save: (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    load: () => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    },
    clear: () => {
        localStorage.removeItem('cart');
    }
};

// Add this to make sure the function is available globally
window.checkout = checkout;

// Make sure it's available globally
window.showNotification = showNotification;
