import React, { useState, useEffect } from 'react'
import { getProducts } from '../../APIs/product';
import TypewriterEffect from '../Cards/TypewriterEffect';
import LoadingSkeleton from "../Cards/LoadingSkeleton";
import ProductCard from '../Cards/PrdouctCard';


const BestSellers = ({styles}) => {


    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProducts("createdAt", "asc", 3)
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
    
    <section>
        <h4 className={styles.NewArrivals}>
        <TypewriterEffect  text={[
  "Explore Our Best-Selling Favorites",
  "Discover Our Most Popular Items",
  "Find Out Why These Products Are a Hit",
  "Don't Miss Out on Our Top Picks",
]
        } />
        </h4>
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
  )
}

export default BestSellers