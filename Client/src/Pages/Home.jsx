import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../APIs/product';
import { HashLoader } from 'react-spinners';
import styles from './Home.module.css';
import ProductCard from "../Components/Cards/PrdouctCard"
import TypewriterEffect from '../Components/Cards/TypewriterEffect';
import LoadingSkeleton from '../Components/Cards/LoadingSkeleton';

const Home = ({ text }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(3)
      .then((res) => {
        setProducts(res);
        setLoading(false); 
      })
      .catch((err) => {
        console.log('Error in getting products', err);
        setLoading(false); 
      });
  };

  return (
    loading ? (
      <div className={styles.loaderContainer}>
        <HashLoader color={'blue'} loading={loading} size={330} />
      </div>
    ) : (
      <>
        <section className={styles.landingSection}>
          <TypewriterEffect
            text={[
              'Welcome to Our E-commerce Store',
              'Discover Our Premium Product Selection',
              'Stay Updated with the Latest Trends',
              'Shop Conveniently from Anywhere',
              'Enjoy a Seamless Shopping Experience',
            ]}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,186.7C672,160,768,96,864,106.7C960,117,1056,203,1152,197.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </section>
        <section>
          {loading ? (
            <LoadingSkeleton count={6}/>
          ) : (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <div key={product._id} className={styles.productGridItem}>
                  <ProductCard product={product} loadAllProducts={loadAllProducts} />
                </div>
              ))}
            </div>
          )}
        </section>
      </>
    )
  );
};

export default Home;
