import React, { useState, useEffect } from "react";
import styles from "../../Styles/Checkout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../../APIs/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [adress, setAdress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.products);
      setTotal(res.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.info("Cart is empty");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, adress).then((res) => {
      if (res.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      } else {
        toast.error("Address not saved");
      }
    });
  };
  return (
    <div className={styles.gridContainer}>
      <div>
        <h1>Delivery Address</h1>
        <br />
        <br />
        <ReactQuill theme="snow" value={adress} onChange={setAdress} />
        <button onClick={saveAddressToDb}>Save</button>
        <hr />
        <h4>Got Coupon</h4>
        <br />
        Apply A Coupon
      </div>
      <div>
        <h4>Order Summary</h4>
        <hr />
        <h4>{products.length} Products</h4>
        <p>List of products</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            {p.product.title} ({p.color}) x {p.count} = $
            {p.product.price * p.count}
          </div>
        ))}
        <hr />
        Cart Total : {total}
        <div className={styles.gridContainer}>
          <div>
            <button disabled={!addressSaved || !products.length}>
              Place Order
            </button>
          </div>
          <div>
            <button disabled={!products.length} onClick={emptyCart}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
