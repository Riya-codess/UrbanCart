const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        image: "images/headphones.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "images/smartwatch.jpg"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1799,
        image: "images/shoes.jpg"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "images/backpack.jpg"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1499,
        image: "images/speaker.jpg"
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 799,
        image: "images/sunglasses.jpg"
    },
    {
        id: 7,
        name: "Travel Bottle",
        price: 599,
        image: "images/bottle.jpg"
    },
    {
        id: 8,
        name: "Casual T-Shirt",
        price: 699,
        image: "images/tshirt.jpg"
    }
];


// Product page - dynamically render products
const productList = document.getElementById("product-list");

if (productList) {
    products.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <a href="product-detail.html">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
            </a>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(card);
    });
}


// Cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(function(item) {
    return {
        ...item,
        quantity: item.quantity || 1
    };
});


// Add product to cart
function addToCart(productId) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update badge immediately
    updateCartCount();

    alert(product.name + " added to cart!");
}


// Cart page - render cart items
const cartItems = document.getElementById("cart-items");

if (cartItems) {
    renderCart();
}


// Display cart items
function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="5">Your cart is empty.</td>
            </tr>
        `;

        calculateTotal();
        updateCartCount();
        return;
    }

    cart.forEach(function(item) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>

            <td>
                <input 
                    type="number" 
                    min="1" 
                    value="${item.quantity}"
                    onchange="updateQuantity(${item.id}, this.value)"
                >
            </td>

            <td>₹${item.price}</td>

            <td>₹${item.price * item.quantity}</td>

            <td>
                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </td>
        `;

        cartItems.appendChild(row);
    });

    calculateTotal();
    updateCartCount();
}


// Update quantity
function updateQuantity(productId, quantity) {
    const product = cart.find(function(item) {
        return item.id === productId;
    });

    product.quantity = Number(quantity);

    if (product.quantity < 1) {
        product.quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update badge immediately
    updateCartCount();

    renderCart();
}


// Remove product
function removeFromCart(productId) {
    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update badge immediately
    updateCartCount();

    renderCart();
}


// Calculate grand total
function calculateTotal() {
    const grandTotal = document.getElementById("grand-total");

    if (!grandTotal) {
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    grandTotal.textContent = "₹" + total;
}


// Checkout form validation
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const nameError = document.getElementById("name-error");
        const addressError = document.getElementById("address-error");
        const pincodeError = document.getElementById("pincode-error");
        const phoneError = document.getElementById("phone-error");

        nameError.textContent = "";
        addressError.textContent = "";
        pincodeError.textContent = "";
        phoneError.textContent = "";

        let valid = true;

        if (name === "") {
            nameError.textContent = "Name is required.";
            valid = false;
        }

        if (address === "") {
            addressError.textContent = "Address is required.";
            valid = false;
        }

        if (!/^\d{6}$/.test(pincode)) {
            pincodeError.textContent = "Pincode must be exactly 6 digits.";
            valid = false;
        }

        if (!/^\d{10}$/.test(phone)) {
            phoneError.textContent = "Phone must be exactly 10 digits.";
            valid = false;
        }

        if (valid) {

            // Clear cart after successful order
            localStorage.removeItem("cart");

            // Update cart badge immediately
            updateCartCount();

            const confirmation = document.getElementById("confirmation");

            confirmation.style.display = "flex";

            checkoutForm.reset();
        }
    });
}


// Update cart item count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce(function(total, item) {
        return total + (item.quantity || 1);
    }, 0);

    cartCount.textContent = totalItems;
}


// Update badge when page loads
updateCartCount();