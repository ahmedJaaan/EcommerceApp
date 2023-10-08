import React, { useEffect, useState } from "react";
import { getSub } from "../../APIs/Sub";
import ProductCard from "../Cards/ProductCard";
import { useParams } from "react-router-dom";
import styles from "../../Styles/Home.module.css";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);

  const { slug } = useParams();
  useEffect(() => {
    getSub(slug).then((s) => {
      setSub(s.sub);
      setProducts(s.products);
    });
  }, [slug]);
  return (
    <>
      <h4 className={styles.NewArrivals}>
        {products.length === 1
          ? `${products.length} Product Available in ${sub.name} Sub Category`
          : `${products.length} Products Available in ${sub.name} Sub Category`}
      </h4>
      <div className={styles.productGrid}>
        {products.map((p) => (
          <div className={styles.productGridItem} key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SubHome;
