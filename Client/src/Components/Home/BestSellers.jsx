import React, { useState, useEffect } from "react";
import { getProducts, getProductsCount } from "../../APIs/product";
import TypewriterEffect from "../Cards/TypewriterEffect";
import LoadingSkeleton from "../Cards/LoadingSkeleton";
import ProductCard from "../Cards/ProductCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BestSellers = ({ styles }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
      .then((res) => {
        setProductsCount(res);
        // console.log("Products Count", res);
      })
      .catch((err) => {
        console.log("Error in getting products count", err);
      });
  }, []);

  const loadAllProducts = () => {
    getProducts("sold", "desc", page)
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in getting products", err);
        setLoading(false);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <section>
      <h4 className={styles.NewArrivals}>
        <TypewriterEffect
          text={[
            "Explore Our Best-Selling Favorites",
            "Discover Our Most Popular Items",
            "Find Out Why These Products Are a Hit",
            "Don't Miss Out on Our Top Picks",
          ]}
        />
      </h4>
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productGridItem}>
              <ProductCard
                product={product}
                loadAllProducts={loadAllProducts}
              />
            </div>
          ))}
        </div>
      )}
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          count={Math.ceil(productsCount && productsCount.length / 3)}
          page={page}
          size="small"
          onChange={handleChangePage}
        />
      </Stack>
    </section>
  );
};

export default BestSellers;
