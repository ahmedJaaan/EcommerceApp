import React, {useState, useEffect} from 'react'
import {getProductsByCount} from "../APIs/product"
import {HashLoader} from "react-spinners";
import styles from "./Home.module.css"
import PrdouctCard from '../Components/Cards/PrdouctCard';


const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(3)
    .then(res => {
      // console.log(res);
      setProducts(res);
      setLoading(false);
    }).catch(err => {
      console.log("Error in getting products",err);
      setLoading(false);
    })
  }
  return (
    loading ? (
      <div className={styles.loaderContainer}>
        <HashLoader color={'blue'} loading={loading} size={330} />
      </div>
    ) : (
      <>
        <section className={styles.landingSection}>
        
          <h1>Latest Products</h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,186.7C672,160,768,96,864,106.7C960,117,1056,203,1152,197.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </section>
        <section>
        <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product._id} className={styles.productGridItem}>
          <PrdouctCard product={product} loadAllProducts={loadAllProducts} />
          </div>
      ))}
           </div>
        </section>
        </>
    )
  );
    }
export default Home


