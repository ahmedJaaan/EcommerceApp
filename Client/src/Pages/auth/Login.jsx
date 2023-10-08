import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "../../Styles/auth.module.css";
import { auth, googleAuthProvider } from "../../firebase";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { createOrUpdateUser } from "../../APIs/auth";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  // // console.log(user);
  useEffect(() => {
    let intended = location.state?.from;
    if (intended) {
      return;
    }
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate, location]);

  const intendedRedirect = (res) => {
    const intended = location.state?.from;
    // console.log(intended);
    if (intended) {
      navigate(intended);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // console.log("hhhhhhhhhhhh",idTokenResult.token)
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
          intendedRedirect(res);
        })
        .catch((err) => console.log("error in creating or updating user", err));

      toast.success("Logged in successfully");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Invalid password.");
      } else {
        toast.error("Failed to log in. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const googleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
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
          intendedRedirect(res);
        })
        .catch((err) => console.log("error in creating or updating user", err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoogleLoading(false);
      toast.success("You have logged in using Google");
    }
  };
  const loginFormJSX = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Login</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputForRegistration}
        autoFocus
        placeholder="Enter Your Email"
      />
      <input
        type="password"
        value={password}
        className={styles.inputForRegistrationComplete}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter Your Password"
      />
      <br />
      <button
        type="submit"
        className={styles.registrationButton}
        disabled={!email || password.length < 6}
      >
        {isLoading ? (
          <RingLoader size={25} color={"white"} loading={isLoading} />
        ) : (
          <>
            <AiOutlineMail size={25} />
            Login With Email And Password
          </>
        )}
      </button>
      <p style={{ color: "blueviolet" }}>or</p>
      <button
        onClick={googleLogin}
        type="button"
        className={styles.GoogleButton}
      >
        {isGoogleLoading ? (
          <RingLoader size={25} color={"white"} loading={isGoogleLoading} />
        ) : (
          <>
            <FcGoogle size={25} />
            Login With Google
          </>
        )}
      </button>
      <Link
        style={{ marginTop: "3px", textDecoration: "none" }}
        to="/forgot/password"
      >
        Forgot Password?
      </Link>
    </form>
  );

  return <div className={styles.container}>{loginFormJSX}</div>;
};

export default Login;
