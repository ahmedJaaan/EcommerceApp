import React from "react";
import ProductCard from "../Cards/ProductCard";

const FilteredProducts = ({ products, styles }) => {
  return (
    <div>
      <div>
        {products && products.length < 1 && <h1>`No Products Found`</h1>}
        <div className={styles.productGrid}>
          {products &&
            products.map((p) => (
              <div key={p._id} className={styles.productGridItem}>
                <ProductCard product={p} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
