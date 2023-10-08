import React, { useState, useEffect } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "../../Styles/auth.module.css";
import { auth } from "../../firebase";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error("Email is required");
      setIsLoading(false); // Reset loading state
      return;
    }

    const actionCodeSettings = {
      url: "http://localhost:5173/register/complete",
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        toast.success(
          `Email has been Sent To ${email} For Registration, Please Check Your Inbox for Link`
        );
        window.localStorage.setItem("emailForRegistration", email);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const registerForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Register</h1>

      <input
        type="email"
        value={email}
        className={styles.inputForRegistration}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Your Email"
      />
      <button
        type="submit"
        className={styles.registrationButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <RingLoader size={25} color={"white"} loading={isLoading} />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );

  return <div className={styles.container}>{registerForm}</div>;
};

export default Register;
