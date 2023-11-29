import React, { useState, useEffect } from "react";
import styles from "../../Styles/Checkout.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../../APIs/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdOutlineDataSaverOff } from "react-icons/md";
import { RingLoader, SyncLoader } from "react-spinners";
import { IoTicketOutline } from "react-icons/io5";
import { FaMartiniGlassEmpty } from "react-icons/fa6";
import { TbShip } from "react-icons/tb";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
  const [discountErr, setDiscountErr] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.products);
      setTotal(res.cartTotal);
    });
  }, [user.token]);

  const emptyCart = () => {
    setCartLoading(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotalPriceAfterDiscount(0);
      setDiscountErr("");
      setCoupon("");
      setTotal(0);
      toast.info("Cart is empty");
      setCartLoading(false);
    });
  };

  const saveAddressToDb = () => {
    if (address === "<p><br></p>") {
      toast.error("Please enter address");
      return;
    }

    setAddressLoading(true);
    saveUserAddress(user.token, address).then((res) => {
      if (res.ok) {
        setAddressSaved(true);
        setAddressLoading(false);
        toast.success("Address saved");
      } else {
        toast.error("Address not saved");
        setAddressLoading(false);
      }
    });
  };

  const applyDiscountCoupon = () => {
    setCouponLoading(true);
    applyCoupon(coupon, user.token)
      .then((res) => {
        if (res.error) {
          setTotalPriceAfterDiscount(0);
          setDiscountErr(res.error);
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          toast.error(res.error);
        } else {
          setTotalPriceAfterDiscount(res.totalAfterDiscount);
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
          toast.success("Coupon applied successfully");
        }
        setCouponLoading(false);
      })
      .catch((error) => {
        setTotalPriceAfterDiscount(0);
        setDiscountErr(error.message || "An error occurred");
        toast.error(error.message || "An error occurred");
        setCouponLoading(false);
      });
  };

  const showAddress = () => (
    <>
      <h1 className={styles.heading}>Delivery Address</h1>
      <br />
      <br />
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button
        onClick={saveAddressToDb}
        disabled={!products.length}
        className={styles.Button}
      >
        {addressLoading ? (
          <SyncLoader color="#ffffff" />
        ) : (
          <>
            Save Address <MdOutlineDataSaverOff size={20} />
          </>
        )}
      </button>
    </>
  );

  const showProductsSummary = () => (
    <>
      <h1 className={styles.heading} style={{ marginBottom: "54px" }}>
        Order Summary
      </h1>
      <hr style={{ marginBottom: "20px" }} />
      <table>
        <thead>
          <tr>
            <th>Products</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{p.product.title}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>${p.product.price * p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className={styles.totalAmountSection}>
        Total Amount:{" "}
        <b
          className={
            totalPriceAfterDiscount > 0 ? styles.striked : styles.total
          }
        >
          ${total}
        </b>
      </div>
      {totalPriceAfterDiscount > 0 && (
        <div className={styles.totalAmountSection}>
          Total Amount After Discount:
          <b style={{ marginLeft: "auto" }}>${totalPriceAfterDiscount}</b>
        </div>
      )}
    </>
  );

  const showApplyCoupon = () => (
    <>
      <h1 className={styles.heading}>Got a Coupon?</h1>
      <input
        onChange={(e) => {
          setCoupon(e.target.value.toUpperCase()), setDiscountErr("");
        }}
        type="text"
        className={styles.couponInput}
        value={coupon}
        placeholder="Apply Here"
      />
      {discountErr && (
        <p style={{ color: "red", textAlign: "center" }}>{discountErr}</p>
      )}
      <br />
      <button
        onClick={applyDiscountCoupon}
        disabled={!products.length}
        className={styles.Button}
      >
        {couponLoading ? (
          <SyncLoader color="#ffffff" />
        ) : (
          <>
            Apply Coupon <IoTicketOutline size={23} />
          </>
        )}
      </button>
      <br />
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      if (res.ok) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
      }
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      dispatch({
        type: "COD",
        payload: false,
      });
      emptyUserCart(user.token);
      setTimeout(() => {
        toast.success("Order placed successfully");
        navigate("/user/history");
      }, 1000);
    });
  };

  return (
    <div className={styles.gridContainer}>
      <div>
        {showAddress()}
        <hr />
        {showApplyCoupon()}
        <br />
      </div>
      <div>
        {showProductsSummary()}
        <div className={styles.gridContainer}>
          <div>
            {COD === false ? (
              <button
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
                className={styles.Button}
              >
                Place Order
                <TbShip size={20} />
              </button>
            ) : (
              <button
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
                className={styles.Button}
              >
                Place Order
                <TbShip size={20} />
              </button>
            )}
          </div>
          <div>
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className={`${styles.Button} ${styles.emptyCart}`}
            >
              {cartLoading ? (
                <RingLoader color="#ffffff" size={20} />
              ) : (
                <>
                  Empty Cart <FaMartiniGlassEmpty />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
