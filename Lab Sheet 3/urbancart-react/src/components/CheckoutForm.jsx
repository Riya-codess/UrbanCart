import { useState } from "react";

function CheckoutForm({ cart = [], onOrderPlaced }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        pincode: "",
        phone: "",
        paymentMethod: "Cash on Delivery"
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Show success popup
        setOrderPlaced(true);

        // Clear cart after placing order
        onOrderPlaced();

        // Reset form
        setFormData({
            name: "",
            address: "",
            pincode: "",
            phone: "",
            paymentMethod: "Cash on Delivery"
        });
    }

    const grandTotal = cart.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    return (
        <>
            <div className="checkout-container">

                {/* Left Side - Form */}
                <div className="checkout-details">

                    <h2>Checkout</h2>

                    <h3>Shipping Details</h3>

                    <form onSubmit={handleSubmit}>

                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <div className="checkout-row">

                            <div>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength="6"
                                    required
                                />
                            </div>

                            <div>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                    required
                                />
                            </div>

                        </div>

                        <label>Payment Method</label>

                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="Cash on Delivery">
                                Cash on Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card">
                                Card
                            </option>
                        </select>

                        <button
                            type="submit"
                            className="place-order-button"
                        >
                            🛒 Place Order
                        </button>

                    </form>
                </div>

                {/* Right Side - Order Summary */}
                <div className="order-summary">

                    <h2>Order Summary</h2>

                    {cart.length === 0 ? (
                        <p className="summary-empty">
                            Your cart is empty.
                        </p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div
                                    className="summary-item"
                                    key={item.product.id}
                                >

                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />

                                    <div>
                                        <h4>
                                            {item.product.name}
                                        </h4>

                                        <p>
                                            ₹{item.product.price}
                                        </p>

                                        <small>
                                            Qty: {item.quantity}
                                        </small>
                                    </div>

                                </div>
                            ))}

                            <div className="summary-total">
                                <span>Total Amount</span>
                                <strong>₹{grandTotal}</strong>
                            </div>
                        </>
                    )}

                </div>

            </div>

            {/* Success Modal */}
            {orderPlaced && (
                <div className="success-overlay">

                    <div className="success-modal">

                        <div className="success-check">
                            ✓
                        </div>

                        <h2>
                            Order Placed Successfully!
                        </h2>

                        <p>
                            Thank you for shopping with UrbanCart.
                        </p>

                        <button
                            onClick={() => setOrderPlaced(false)}
                            className="success-ok-button"
                        >
                            OK
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default CheckoutForm;