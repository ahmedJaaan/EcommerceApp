import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../APIs/product";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Shop.module.css";
import { fetchProductByFilter } from "../../APIs/product";
import { getCategories } from "../../APIs/Category";
import FilterMenu from "./FilterMenu";
import { Checkbox } from "antd";
import FilteredProducts from "./FilteredProducts";

const SearchFilter = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [ok, setOk] = useState(false);
  const [categoriesIds, setCategoriesIds] = useState([]);

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

  useEffect(() => {
    fetchProducts({ category: categoriesIds });
  }, [categoriesIds]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH",
      payload: { text: "" },
    });
    // setCategoriesIds([]);
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
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH",
      payload: { text: "" },
    });
    // setPrice([0, 0]);
    const inTheState = [...categoriesIds];
    const justChecked = e.target.value;
    const foundInState = inTheState.indexOf(justChecked);
    if (foundInState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInState, 1);
    }
    setCategoriesIds(inTheState);
    fetchProducts({ category: inTheState });
    // console.log(inTheState);
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
        <FilteredProducts styles={styles} products={products} />
        <div>
          <FilterMenu
            price={price}
            handleSlider={handleSlider}
            categories={categories}
            fetchProducts={fetchProducts}
            categoriesIds={categoriesIds}
            handleCheck={handleCheck}
          />
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
