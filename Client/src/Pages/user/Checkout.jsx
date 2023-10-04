import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../../APIs/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.products);
      setTotal(res.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {};
  return (
    <div className={styles.gridContainer}>
      <div>
        <h1>DElivery</h1>
        <br />
        <br />
        textArea
        <button onClick={saveAddressToDb}>Place Order</button>
        <hr />
        <h4>Got Coupon</h4>
        <br />
        Apply A Coupon
      </div>
      <div>
        <h4>Order Summary</h4>
        <hr />
        <h4>Products x</h4>
        <p>List of products</p>
        <hr />
        Cart Total : $x
        <div className={styles.gridContainer}>
          <div>
            <button>Place Order</button>
          </div>
          <div>
            <button>Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
