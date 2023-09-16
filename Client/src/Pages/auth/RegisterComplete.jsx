import React, { useEffect, useState } from 'react';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import styles from './auth.module.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { RingLoader } from 'react-spinners'; // Import RingLoader

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true while processing

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      setIsLoading(false); // Reset loading state
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      setIsLoading(false); // Reset loading state
      return;
    }

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      if (result.user.emailVerified === true) {
        window.localStorage.removeItem('emailForRegistration');

        if (auth.currentUser) {
          await updatePassword(auth.currentUser, password);
          const idTokenResult = await auth.currentUser.getIdTokenResult();
          navigate('/');
          toast.success('You have been registered successfully.');
        } else {
          toast.error('Something went wrong.');
        }
      }
    } catch (error) {
      console.error('Firebase authentication error:', error);
      toast.error('An error occurred during registration.');
    } finally {
      setIsLoading(false); 
    }
  };

  const registerCompleteForm = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Complete Registration</h1>

      <input
        type='email'
        value={email}
        className={styles.inputForRegistration}
        autoFocus
        disabled
      />
      <input
        type='password'
        value={password}
        className={styles.inputForRegistrationComplete}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder='Enter Your Password'
      />
      <button type="submit" className={styles.registrationButton} disabled={isLoading}>
        {isLoading ? (
          <RingLoader
            size={25}
            color={'white'}
            loading={isLoading}
          />
        ) : (
          'Complete Registration'
        )}
      </button>
    </form>
  );

  return (
    <div className={styles.container}>
      {registerCompleteForm}
    </div>
  );
}

export default RegisterComplete;
