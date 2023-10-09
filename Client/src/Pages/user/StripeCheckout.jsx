import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../APIs/stripe";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { PulseLoader, RingLoader } from "react-spinners";
import { createOrder, emptyUserCart } from "../../APIs/user";
const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [countdown, setCountdown] = useState(20);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log(res);
      setClientSecret(res.clientSecret);
      setCartTotal(res.cartTotal);
      setTotalAfterDiscount(res.totalAfterDiscount);
      setPayableAmount(res.payableAmount);
    });
  }, [user.token]);

  useEffect(() => {
    if (succeeded && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 1) {
        clearInterval(timer);
        navigate("/user/history");
        console.log("done");
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [succeeded, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(user.token, payload).then((res) => {
        if (res.ok) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          emptyUserCart(user.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div>
      {succeeded ? (
        <h1
          style={{ textAlign: "center", fontWeight: "500" }}
          className="success-message"
        >
          Payment Successful <AiOutlineCheckCircle size={30} />
        </h1>
      ) : (
        <h1 style={{ textAlign: "center", fontWeight: "500" }}>
          Complete your purchase
        </h1>
      )}
      <div className="totalpay-container">
        <div className="totalPay">
          <p className="total">
            Total Amount:
            <AiOutlineDollarCircle size={18} />
            {cartTotal}
          </p>
          <p className="total" style={{ color: "blue" }}>
            Payable:
            <AiOutlineDollarCircle size={18} />
            {Math.floor(payableAmount / 100)}
          </p>
        </div>
      </div>

      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "500",
              marginBottom: "40px",
            }}
          >
            Enter your Card
          </h1>
          <CardElement className="card-element" onChange={handleChange} />
          <button
            className="pay-button"
            disabled={processing || disabled || succeeded}
          >
            {processing ? (
              <RingLoader color={"#fff"} loading={true} size={20} />
            ) : (
              "Complete Payment"
            )}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {succeeded && countdown > 0 && (
          <p style={{ color: "blue", display: "inline" }}>
            Redirecting you to{" "}
            <NavLink
              to="/user/history"
              style={{ textDecoration: "none", color: "blue" }}
            >
              History
            </NavLink>{" "}
            in {countdown} seconds{" "}
            <PulseLoader color={"blue"} size={10} speedMultiplier={0.7} />
          </p>
        )}
      </div>
    </div>
  );
};

export default StripeCheckout;
