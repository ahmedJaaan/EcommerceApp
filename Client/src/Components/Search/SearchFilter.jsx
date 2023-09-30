import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../APIs/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Cards/ProductCard";
import styles from "./Shop.module.css";
import { fetchProductByFilter } from "../../APIs/product";
import SearchMenu from "./SearchMenu";
import { getCategories } from "../../APIs/Category";

const SearchFilter = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [ok, setOk] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  useEffect(() => {
    const delay = 300;
    const timeoutId = setTimeout(() => {
      fetchProducts({ query: text });
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const fetchProducts = (arg) => {
    fetchProductByFilter(arg)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log("Error in fetching products filter", err);
      });
  };

  const loadAllProducts = () => {
    getProductsByCount(12)
      .then((p) => {
        // console.log(data);
        setProducts(p);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.containerStyle}>
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
        <div>
          <SearchMenu
            handleSlider={handleSlider}
            price={price}
            categories={categories}
          />
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
