import React, { useState, useEffect } from 'react'
import { getProducts } from '../../APIs/product';
import TypewriterEffect from '../Cards/TypewriterEffect';
import LoadingSkeleton from "../Cards/LoadingSkeleton";
import ProductCard from '../Cards/PrdouctCard';


const NewArrival = ({styles}) => {


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
        console.log('Error in getting products', err);
        setLoading(false); 
      });
  };

  return (
    
    <section>
        <h4 className={styles.NewArrivals}>
        <TypewriterEffect text={[
            "Explore Our Exciting New Arrivals",
            "Discover the Latest Must-Have Items",
            "Stay In the Know with Our Newest Products",
            "Don't Miss Out on Our Fresh Selection",
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

export default NewArrival