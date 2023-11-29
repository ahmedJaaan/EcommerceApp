import React from "react";
import ProductCard from "../Cards/ProductCard";
import { HashLoader } from "react-spinners";
import TypewriterEffect from "../Cards/TypewriterEffect";

const FilteredProducts = ({ products, styles }) => {
  return (
    <div>
      <div>
        {products && products.length < 1 && (
          <div
            className={styles.noProducts}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              color: "red",
            }}
          >
            <h1>
              <TypewriterEffect
                text={["No Products Found", "Please Try Searching For Another"]}
              />
            </h1>
          </div>
        )}
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
