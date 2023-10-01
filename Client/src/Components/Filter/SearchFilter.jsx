import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../APIs/product";
import { useSelector, useDispatch } from "react-redux";
import styles from "./FilterMenu.module.css";
import { fetchProductByFilter } from "../../APIs/product";
import { getCategories } from "../../APIs/Category";
import FilterMenu from "./FilterMenu";
import FilteredProducts from "./FilteredProducts";
import { getSubs } from "../../APIs/Sub";

const SearchFilter = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [ok, setOk] = useState(false);
  const [categoriesIds, setCategoriesIds] = useState([]);
  const [stars, setStars] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res);
    });
    getSubs().then((res) => {
      setSubs(res);
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
  const handleStarClick = (num) => {
    setStars(num);
    fetchProducts({ stars: num });
  };

  const handleSub = (sub) => {
    setSub(sub);
    fetchProducts({ subs: sub });
  };
  return (
    <>
      <div className={styles.containerStyle}>
        <FilteredProducts styles={styles} products={products} />
        <div>
          <FilterMenu
            price={price}
            categories={categories}
            fetchProducts={fetchProducts}
            categoriesIds={categoriesIds}
            handleSlider={handleSlider}
            handleSub={handleSub}
            handleCheck={handleCheck}
            handleStarClick={handleStarClick}
            subs={subs}
          />
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
