import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Cart.module.css";
import ProductCardInCheckOut from "../../Components/Cards/ProductCardInCheckOut";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.price * nextValue.count;
    }, 0);
  };

  const showCartItems = () => (
    <table className={styles.table}>
      <thead className={styles.thread}>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckOut key={p._id} p={p} styles={styles} />
      ))}
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div>
          {!cart.length ? (
            <h1>
              Cart is Empty <NavLink to="/shop">Shop Now</NavLink>
            </h1>
          ) : (
            showCartItems()
          )}
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>Order Summary</h1>
          <hr />
          <>
            <h4
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "10px",
                marginLeft: "5px",
              }}
            >
              Products <span>Price</span>
            </h4>
          </>
          {cart.map((c, i) => (
            <div key={i}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#eee",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {c && c.title} x {c && c.count}
                <span>=${c && c.price * c.count}</span>
              </p>
            </div>
          ))}
          <hr />
          <div
            style={{
              backgroundColor: "#eee",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total Price:</span>
              <span>${getTotal()}</span>
            </span>
          </div>
          <hr />
          {user ? (
            <button
              //   onClick={saveOrderToDb}
              className={styles.button}
              disabled={cart.length === 0}
            >
              Proceed To Checkout
            </button>
          ) : (
            <NavLink
              to="/login"
              state={{
                from: "/cart",
              }}
              className={styles.NavLink}
            >
              Login To Checkout
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
