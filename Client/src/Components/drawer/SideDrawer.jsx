import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../Styles/Drawer.module.css";
import { NavLink } from "react-router-dom";
import defaultImg from "../../assets/5191452-200.png";
import { TbShoppingCart } from "react-icons/tb";
import { Card } from "antd";
const { Meta } = Card;
const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      title={`Cart (${cart.length})`}
      open={drawer}
      onClose={() => dispatch({ type: "TOGGLE_DRAWER", payload: false })}
    >
      {cart.map((product) => (
        <Card
          style={{ marginBottom: "10px", border: "2px solid aquamarine" }}
          key={product._id}
          cover={
            product.images && product.images.length ? (
              <>
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className={styles.cartItemImg}
                  style={{ objectFit: "cover" }}
                />
              </>
            ) : (
              <img src={defaultImg} alt={product.title} />
            )
          }
        >
          <Meta
            title={`${product.title} x ${product.count}`}
            description={product.description}
            style={{ textAlign: "center" }}
          />
        </Card>
      ))}
      <NavLink to="/cart">
        <button
          className={styles.cartButton}
          onClick={() => dispatch({ type: "TOGGLE_DRAWER", payload: false })}
        >
          Go To Cart
          <TbShoppingCart size={20} />
        </button>
      </NavLink>
    </Drawer>
  );
};

export default SideDrawer;
