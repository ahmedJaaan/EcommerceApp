import React, { useState } from 'react';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import styles from './auth.module.css'; // Import the external CSS file
import 'react-toastify/dist/ReactToastify.css'
import app from '../../firebase';


const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:5173/register/complete',
      handleCodeInApp: true,
    }

    const auth = getAuth(app);

    sendSignInLinkToEmail(auth, email, actionCodeSettings).then(
      toast.success(` Email has been Sent To ${email} For Registration, Please Check Your Inbox for Link`)
    ).catch((err) => (console.log(err)));
  };

  const registerForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
    <h1 className={styles.headingForRegistration}>Register</h1>

      <input
        type='email'
        value={email}
        className={styles.inputForRegistration}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className={styles.registrationButton}>Register</button>
    </form>
  );

  return (
    <div className={styles.container}>
    <ToastContainer /> 
      {registerForm}
    </div>
  );
}

export default Register;
