import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./cards.module.css";
import { Card } from "antd";
import { DiRaphael } from "react-icons/di";
import { GiCartwheel } from "react-icons/gi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "../../assets/5191452-200.png";
import ProductItemList from "../Home/ProductItemList";
import { Tabs } from "antd";
import ReactStars from "react-stars";
import StarRatingPopup from "../Popup/StarRatingPopup";
import { showAverage } from "../../APIs/rating";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let unique = [];

  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        unique = JSON.parse(localStorage.getItem("cart"));
      }
      unique.push({
        ...product,
        count: 1,
      });
      unique = _.uniqWith(unique, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
    }
    setTooltip("Added");
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "TOGGLE_DRAWER",
      payload: true,
    });
  };

  return (
    <div className={styles.containerStyle}>
      <div>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <div key={image.public_id} style={{ objectFit: "cover" }}>
                  <img src={image.url} alt={title} />
                </div>
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={defaultImage}
                alt={title}
                style={{
                  height: "450px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            }
          />
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
        </Tabs>
      </div>

      <div>
        <span className={styles.viewHeadingContainer}>
          <h1 className={styles.viewHeading}>{title}</h1>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {product && product.ratings && product.ratings.length
            ? showAverage(product)
            : "NO Rating Yet"}
        </span>
        <Card
          actions={[
            <div className={styles.actions}>
              <div className={styles.cartIcon} onClick={handleAddToCart}>
                <Tooltip title={tooltip}>
                  <GiCartwheel size={32} />
                  <br />
                  Add To Cart
                </Tooltip>
              </div>
              <div className={styles.wishlistIcon}>
                <NavLink
                  className={styles.wishlistIcon}
                  style={{ color: "blueViolet" }}
                >
                  <DiRaphael size={32} />
                  <br />
                  Add To wishlist
                </NavLink>
                ,
              </div>

              <div className={styles.ratingIcon}>
                <StarRatingPopup>
                  <ReactStars
                    id={_id}
                    value={star}
                    count={5}
                    size={50}
                    onChange={onStarClick.bind(null, _id)}
                    isSelectable={true}
                  />
                </StarRatingPopup>
              </div>
            </div>,
          ]}
        >
          <ProductItemList product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
