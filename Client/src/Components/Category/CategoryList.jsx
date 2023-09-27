import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {getCategories} from "../../APIs/Category"
import styles from "./CategoryList.module.css"
const CategoryList = () => {
    const [categories, setCategories] = useState([])
    
    
    useEffect(() => {
        getCategories().then(c => {
            setCategories(c)
        })
    }, [])

    const showCategories = () => {
        return (
          <div className={styles.container}>
            {categories.map((c) => (
              <div key={c._id} className={styles.box}>
                <span className={styles.linkSpan}>
                  <NavLink to={`/category/${c._id}`} className={styles.link}>
                    {c.name}
                  </NavLink>
                </span>
              </div>
            ))}
          </div>
        );
      };
      
  return (
    <div>
    {showCategories()}
    </div>
  )
}

export default CategoryList