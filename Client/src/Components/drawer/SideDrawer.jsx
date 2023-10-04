import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Drawe.module.css";
import { NavLink } from "react-router-dom";
import defaultImg from "../../assets/5191452-200.png";
import { SiCarto } from "react-icons/si";
import { TbBrandGolang, TbShoppingCart } from "react-icons/tb";
const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      className={styles.drawer}
      title={`Cart (${cart.length})`}
      open={drawer}
      onClose={() => dispatch({ type: "TOGGLE_DRAWER", payload: false })}
    >
      {cart.map((product) => (
        <div key={product._id} className={styles.cartItem}>
          <div className={styles.cartItem}>
            {product.images && product.images.length ? (
              <>
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className={styles.cartItemImg}
                />
                <p className={styles.cartItemTitle}>
                  {product.title} * {product.count}
                </p>
              </>
            ) : (
              <img src={defaultImg} alt={product.title} />
            )}
          </div>
        </div>
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
