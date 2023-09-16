import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import styles from './auth.module.css';
import { auth, googleAuthProvider } from '../../firebase'; 
import { AiOutlineMail } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners'; 
import { FcGoogle } from 'react-icons/fc'; 
import axios from "axios";

const createOrUpdateUser = async(authtoken) => {
  return await axios.post(
    "http://localhost:8080/api/create-or-update-user",
    {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    }

  )
}



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => ({...state}))
 
  useEffect(() => {
    if(user && user.token) {
        navigate('/')
    }
}, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
      .then(res => console.log("Create or Update Res", res ))
      .catch((err) => console.log("Error in update create res", res));
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult,
        },
      });
      navigate('/');
    } catch (error) {
      const errorCode = error.message;
      const errorMessage = errorCode;

      toast.error(errorMessage);
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
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult,
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoogleLoading(false);
      toast.success("You have logged in using google")
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
          <RingLoader
            size={25}
            color={'white'} 
            loading={isLoading}
          />
        ) : (
          <>
            <AiOutlineMail size={25} />
            Login With Email And Password
          </>
        )}
      </button>
      <p style={{color: 'blueviolet'}}>or</p>
      <button
        onClick={googleLogin}
        type="button" 
        className={styles.GoogleButton}
      >
        {isGoogleLoading ? (
          <RingLoader
            size={25}
            color={'white'} 
            loading={isGoogleLoading}
          />
        ) : (
          <>
            <FcGoogle size={25} />
            Login With Google
          </>
        )}
      </button>
      <Link style={{marginTop: '3px', textDecoration: 'none'}}to="/forgot/password">Forgot Password?</Link>
    </form>
  );

  return <div className={styles.container}>{loginFormJSX}</div>;
};

export default Login;
