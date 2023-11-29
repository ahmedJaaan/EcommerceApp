import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../Styles/Cart.module.css";
import ProductCardInCheckOut from "../../Components/Cards/ProductCardInCheckOut";
import { userCart } from "../../APIs/user";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.price * nextValue.count;
    }, 0);
  };

  const saveOrderToDb = () => {
    setLoading(true);
    userCart(cart, user.token)
      .then((res) => {
        if (res.ok) {
          navigate("/checkout");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const saveOrderCashToDb = () => {
    setLoading(true);
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        if (res.ok) {
          navigate("/checkout");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(false);
      });
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
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c, i) => (
                <tr key={i}>
                  <td>{c && c.title}</td>
                  <td>{c && c.count}</td>
                  <td>${c && c.price * c.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className={styles.totalAmountSection}>
            Total Price: <b style={{ marginLeft: "auto" }}>${getTotal()}</b>
          </div>
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className={styles.button}
                disabled={cart.length === 0}
              >
                {loading ? (
                  <PropagateLoader
                    color={"#fff"}
                    size={15}
                    style={{ padding: "10px" }}
                  />
                ) : (
                  "Pay Online With Card"
                )}
              </button>
              <button
                onClick={saveOrderCashToDb}
                className={styles.button}
                disabled={cart.length === 0}
              >
                {loading ? (
                  <PropagateLoader
                    color={"#fff"}
                    size={15}
                    style={{ padding: "10px" }}
                  />
                ) : (
                  "Cash On Delivery"
                )}
              </button>
            </>
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
