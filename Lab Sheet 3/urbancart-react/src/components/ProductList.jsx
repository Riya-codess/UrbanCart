import products from "../products";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
}

export default ProductList;