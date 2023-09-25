import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { Card } from 'antd';
import {DiRaphael} from "react-icons/di"
import {GiCartwheel} from "react-icons/gi"
import {AiOutlineStar} from "react-icons/ai"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "../../assets/5191452-200.png"
import ProductItemList from '../Home/ProductItemList';



const { Meta } = Card;




const SingleProduct = ({ product }) => {

    const { title, description, images, slug } = product;

  return (
    <div className={styles.containerStyle}>
      <div>
        {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop >
          {images && images.map((image) => (
            <div key={image.public_id} style={{ objectFit: 'cover' }}>
              <img
                src={image.url}
                alt={title}
              />
            </div>
          ))}
        </Carousel> 
        ) : (
          <Card cover={<img src={defaultImage} alt={title} 
          style={{ height: "450px", objectFit: "cover", borderRadius: "10px", }} />}
          />
        )}
      </div>
        
      
      
      <div>
      <span className={styles.viewHeadingContainer}>
      <h1 className={styles.viewHeading}>{title}</h1>
      </span>
        <Card  actions={[
        <div className={styles.actions}>
        <div className={styles.cartIcon}>
        <GiCartwheel size={20}/><br />Add To Cart
        </div>
        <div className={styles.wishlistIcon}>
        <NavLink className={styles.wishlistIcon}style={{color: "blueViolet"}}><DiRaphael size={20} /><br />
        Add To wishlist
        </NavLink>,    
        </div>
      
        <div className={styles.ratingIcon}>
        <AiOutlineStar size={20} /><br />
        <span>Leave a rating</span>
        </div>
        </div>
      ]}>
          <Meta title={title} description={description} />
          <ProductItemList product={product}/>
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
