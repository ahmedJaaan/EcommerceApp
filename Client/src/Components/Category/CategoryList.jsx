import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../APIs/Category";
import styles from "./CategoryList.module.css";
import TypewriterEffect from "../Cards/TypewriterEffect";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c);
    });
  }, []);

  const showCategories = () => {
    return (
      <section>
        <div>
          <h4 className={styles.NewArrivals}>
            <TypewriterEffect
              text={[
                "Browse Our Categories",
                "Discover Exciting Products",
                "Find Your Perfect Item",
              ]}
            />
          </h4>
        </div>
        <div className={styles.container}>
          {categories.map((c) => (
            <div key={c._id} className={styles.box}>
              <span className={styles.linkSpan}>
                <NavLink to={`/category/${c.slug}`} className={styles.link}>
                  {c.name}
                </NavLink>
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return <div>{showCategories()}</div>;
};

export default CategoryList;
