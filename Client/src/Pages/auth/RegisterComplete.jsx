import React, { useEffect, useState } from "react";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "../../Styles/auth.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../APIs/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified === true) {
        window.localStorage.removeItem("emailForRegistration");
        const user = auth.currentUser;
        if (user) {
          await updatePassword(user, password);
          const idTokenResult = await user.getIdTokenResult();
          createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.name,
                  email: res.email,
                  token: idTokenResult.token,
                  role: res.role,
                  _id: res._id,
                },
              });
            })
            .catch((err) =>
              console.log("error in creating or updating user", err)
            );

          navigate("/");
          toast.success("You have been registered successfully.");
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Firebase authentication error:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const registerCompleteForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Complete Registration</h1>

      <input
        type="email"
        value={email}
        className={styles.inputForRegistration}
        autoFocus
        disabled
      />
      <input
        type="password"
        value={password}
        className={styles.inputForRegistrationComplete}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter Your Password"
      />
      <button
        type="submit"
        className={styles.registrationButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <RingLoader size={25} color={"white"} loading={isLoading} />
        ) : (
          "Complete Registration"
        )}
      </button>
    </form>
  );

  return <div className={styles.container}>{registerCompleteForm}</div>;
};

export default RegisterComplete;
