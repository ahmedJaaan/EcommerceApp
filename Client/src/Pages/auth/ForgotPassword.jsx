import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "./auth.module.css";
import { auth } from "../../firebase";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setIsLoading(true);

    const actionCodeSettings = {
      url: "http://localhost:5173/login",
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      toast.success("Check your email for a password reset link");
    } catch (error) {
      console.error("Password reset email error:", error);
      toast.error("An error occurred while sending the password reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const ForgotPasswordForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Forgot Password</h1>

      <input
        type="email"
        value={email}
        className={styles.inputForRegistration}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Your Email For Recovery"
      />
      <button
        type="submit"
        className={styles.registrationButton}
        disabled={!email}
      >
        {isLoading ? (
          <RingLoader size={25} color={"white"} loading={isLoading} />
        ) : (
          "Send Link"
        )}
      </button>
    </form>
  );

  return <div className={styles.container}>{ForgotPasswordForm}</div>;
};

export default ForgotPassword;
