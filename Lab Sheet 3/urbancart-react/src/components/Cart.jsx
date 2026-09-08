function Cart({ cart, removeFromCart }) {
    if (cart.length === 0) {
        return (
            <div className="cart empty-cart">
                <h2>Your Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    const grandTotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <div className="cart">
            <h2>Your Cart</h2>

            <div className="cart-items">
                {cart.map((item) => (
                    <div className="cart-item" key={item.product.id}>

                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="cart-product-image"
                        />

                        <div className="cart-product-info">
                            <h3>{item.product.name}</h3>

                            <p className="cart-price">
                                ₹{item.product.price}
                            </p>

                            <p className="cart-quantity">
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        <div className="cart-subtotal">
                            <strong>
                                ₹{item.product.price * item.quantity}
                            </strong>
                        </div>

                        <button
                            className="remove-button"
                            onClick={() =>
                                removeFromCart(item.product.id)
                            }
                        >
                            Remove
                        </button>

                    </div>
                ))}
            </div>

            <div className="cart-total">
                <span>Grand Total:</span>
                <strong>₹{grandTotal}</strong>
            </div>
        </div>
    );
}

export default Cart;