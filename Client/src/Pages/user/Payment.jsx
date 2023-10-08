import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import "../../Styles/stripe.css";
const stripePromise = loadStripe(
  "pk_test_51NxdiDHdScDtYNxMfDxWJfpw5K1qT0uhcwRT78OSxXToIKihZvQ8XAcrdlVTcpMggzSrXJMPCniixaYlG0urxQz200N4l5SOcJ"
);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <h1>Payment</h1>
        <StripeCheckout />
      </Elements>
    </div>
  );
};

export default Payment;
