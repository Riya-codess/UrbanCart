function ProductCard({ product, addToCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;