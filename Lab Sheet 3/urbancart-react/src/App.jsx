import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

function App() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    function addToCart(product) {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.product.id === product.id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    product: product,
                    quantity: 1
                }
            ];
        });
    }

    function removeFromCart(productId) {
        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.product.id !== productId
            )
        );
    }

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Checkout screen
    if (showCheckout) {
        return (
            <div className="checkout-page">
                <button
                    className="back-button"
                    onClick={() => setShowCheckout(false)}
                >
                    ← Back to Cart
                </button>

                <CheckoutForm
                    cart={cart}
                    onOrderPlaced={() => setCart([])}
                />
            </div>
        );
    }

    return (
        <div>
            <nav className="navbar">
                <h2>UrbanCart</h2>

                <button onClick={() => setShowCart(!showCart)}>
                    🛒 Cart
                    <span id="cart-count">{totalItems}</span>
                </button>
            </nav>

            {!showCart && (
                <ProductList addToCart={addToCart} />
            )}

            {showCart && (
                <div className="cart-section">
                    <Cart
                        cart={cart}
                        removeFromCart={removeFromCart}
                    />

                    {cart.length > 0 && (
                        <button
                            className="checkout-button"
                            onClick={() => setShowCheckout(true)}
                        >
                            Proceed to Checkout →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;