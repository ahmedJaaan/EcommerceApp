import React, { useEffect, useState } from 'react';
import { getProduct, productStars } from '../APIs/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../Components/Cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../APIs/product';
import ProductCard from '../Components/Cards/ProductCard';
import styles from "./Home.module.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0); 
  const [related, setRelated] = useState([]);
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if(product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );
    existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product, user]);

  const loadSingleProduct = async () => {
    try {
      getProduct(slug).then(res => {
        setProduct(res);
        getRelated(res._id).then(res => {
          setRelated(res);
        })
      })
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const onStarClick = (id, newRating) => {
    setStar(newRating);
    // console.log('New Rating:', newRating);
    productStars(id, newRating, user.token)
      .then((res) => {
        // console.log('API Response:', res);
        loadSingleProduct();
      })
      .catch((error) => {
        console.error('Error updating star rating:', error);
      });
  };

  return (
    <>  
    <>
      <SingleProduct product={product} onStarClick={onStarClick} star={star} />
    </>
    <div>
    <hr />
    <h1 style={{textAlign: "center"}}>Related Products</h1>
    <hr />
    <div className={styles.productGrid}>
    {related ? related.map((r) =>
    <div key={r._id} className={styles.productGridItem}>
    <ProductCard product={r} />
    </div> 
    ) : "No Related Products"
    }
    </div>
    </div>
    </>
  );
};

export default Product;
