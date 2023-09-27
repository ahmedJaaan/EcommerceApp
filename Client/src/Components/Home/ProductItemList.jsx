import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProductItemList.module.css';
import { useParams } from 'react-router-dom';


const ProductItemList = ({ product }) => {
  const { price, description, category, subs, shipping, color, brand, quantity, sold } = product;
  return (
    <ul>
      <li className={styles.listContainer}>
        <span >Price</span>
        <span>${price}</span>
      </li>
      <li className={styles.listContainer}>
        <span>Category </span>
        <NavLink to={`/product/${category && category.slug}`}>{category && category.name}</NavLink>
      </li>
        {subs && subs.map((sub) => (
      <li className={styles.listContainer} key={sub._id}>
      <span>Sub Category</span>
      <NavLink to={`/product/${sub && sub.slug}`}>{sub && sub.name}</NavLink>    
      </li>
        ))}
      <li className={styles.listContainer}>
        <span >Shipping</span>
        <span>{shipping}</span>
      </li>
      <li className={styles.listContainer}>
        <span >Color</span>
        <span>{color}</span>
      </li>
      <li className={styles.listContainer}>
        <span >Brand</span>
        <span>{brand}</span>
      </li>
      <li className={styles.listContainer}>
        <span >Available</span>
        <span>{quantity}</span>
      </li>
      <li className={styles.listContainer}>
        <span >Sold</span>
        <span>{sold}</span>
      </li>
    </ul>
  );
};

export default ProductItemList;
