import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import styles from './auth.module.css'; 
import { auth } from '../../firebase';
import {AiOutlineMail} from "react-icons/ai"
import { useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {user} = result

      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult
        }
      })
      navigate("/")
    } catch (error) {
      const errorCode = error.message
      const errorMessage = errorCode

      toast.error(errorMessage)
    }
  };


  const loginForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Login</h1>

      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputForRegistration}
        autoFocus
        placeholder='Enter Your Email'
      />
      <input
        type='password'
        value={password}
        className={styles.inputForRegistrationComplete}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder='Enter Your Password'
      />
      <br />
      <button 
      type="submit" 
      className={styles.registrationButton}
      disabled={!email || password.length < 6}
      >
      Login With Email And Password
      <AiOutlineMail size={17}/>
      </button>
    </form>
  );

  return (
    <div className={styles.container}>
    { loginForm }
    </div>
  );
}

export default Login;
