import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import defaultImg from "../../assets/5191452-200.png";
import { NavLink } from "react-router-dom";
import styles from "./cards.module.css";
import { showAverage } from "../../APIs/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
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
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div>No Rating Yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImg}
            alt={title}
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
              borderRadius: "10px",
            }}
          />
        }
        actions={[
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              className={styles.userIcon}
              style={{
                marginLeft: "45px",
              }}
            >
              <NavLink
                to={`/product/${slug}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <MdOutlineViewInAr
                  key="edit"
                  size={25}
                  style={{ color: "blue" }}
                />
                <br />
                <span
                  style={{
                    color: "blue",
                  }}
                >
                  Details
                </span>
              </NavLink>
            </div>
            <>
              <div className={styles.userIcon}>
                <div onClick={handleAddToCart}>
                  <Tooltip title={tooltip} placement="topRight">
                    <FaOpencart
                      key="delete"
                      size={25}
                      style={{
                        color: "red",
                        marginLeft: "150px",
                      }}
                    />
                    <span
                      style={{
                        color: "red",
                        marginLeft: "150px",
                      }}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </span>
                  </Tooltip>
                </div>
              </div>
            </>
          </div>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 100)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
