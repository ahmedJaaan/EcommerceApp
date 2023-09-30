import React, { useState, useEffect } from "react";
import { getProducts } from "../APIs/product";
import { HashLoader } from "react-spinners";
import styles from "./Home.module.css";
import NewArrival from "../Components/Home/NewArrival";
import BestSellers from "../Components/Home/BestSellers";
import LandingSection from "../Components/Home/LandingSection";
import CategoryList from "../Components/Category/CategoryList";
import SubList from "../Components/Category/SubList";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProducts("createdAt", "desc", 3)
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in getting products", err);
        setLoading(false);
      });
  };

  return loading ? (
    <div className={styles.loaderContainer}>
      <HashLoader color={"blue"} loading={loading} size={330} />
    </div>
  ) : (
    <>
      <LandingSection styles={styles} />
      <NewArrival styles={styles} />
      <BestSellers styles={styles} />
      <CategoryList />
      <SubList />
    </>
  );
};

export default Home;
