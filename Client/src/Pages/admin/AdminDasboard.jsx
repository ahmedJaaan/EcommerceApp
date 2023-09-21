import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../../APIs/product';
import { HashLoader } from 'react-spinners';
import styles from './Dashboard.module.css';
import AdminCard from '../../Components/Cards/AdminCard';


const AdminDasboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then(data => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false); 
      });
  };

  return (
    <div>
      {loading ? ( 
        <div className={styles.loaderContainer}>
          <HashLoader color={'blue'} loading={loading} size={330} />
        </div>
      ) : (
        <>
        <h1 style={{textAlign: "center"}}>All Product</h1>
        <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product._id} className={styles.productGridItem}>
          <AdminCard product={product} />
          </div>
           )
           )
           }
           </div>
        </>
      )}
    </div>
  );
};

export default AdminDasboard;
