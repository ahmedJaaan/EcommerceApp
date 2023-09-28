import React, { useEffect, useState } from 'react'
import {getCategory} from "../../APIs/Category";
import ProductCard from "../Cards/ProductCard";
import { NavLink, useParams } from 'react-router-dom';
import styles from "../../Pages/Home.module.css"

const CategoryHome = () => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    const {slug} = useParams();
    useEffect(() => {
        getCategory(slug)
        .then(c => {
            setCategory(c.category);
            setProducts(c.products);
        })
    }, [slug]);
  return (
    <>
        <h4 className={styles.NewArrivals}>
        {products.length === 1
        ? `${products.length} Product Available in ${category.name}`
        : `${products.length} Products Available in ${category.name}`}
        </h4>

        <div className={styles.productGrid}>
                {products.map((p) => (
                    <div className={styles.productGridItem} key={p._id}>
                    <ProductCard product={p} />
                    </div>
                ))}
        </div>
    </>
  )
}

export default CategoryHome