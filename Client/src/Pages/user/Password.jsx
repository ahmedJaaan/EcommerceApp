import React, { useState, useEffect } from 'react';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import styles from '../auth/auth.module.css'; 
import { auth } from '../../firebase';
import { RingLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Password = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useSelector((state) => ({...state}))
  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!password) {
      toast.error('Passoword is required');
      setIsLoading(false); 
      return;
    }

    
    updatePassword(auth.currentUser, password)
    .then(()=> {
        toast.success("You have Succesfully updated your password")
        navigate("/")
    })
    .catch(err => {
        setIsLoading(false)
        console.log("Case is sensitive please login again to change password", err);
    })
    .finally(() => {
        setIsLoading(false); 
    });
  };

  const PassowordUpdate = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.headingForRegistration}>Update Your Passoword</h1>

      <input
        type='Password'
        className={styles.inputForRegistration}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder='Enter your new Password'
        disabled={isLoading}
      />
      <button type="submit" className={styles.registrationButton} disabled={password.length < 6 ||isLoading}>
        {isLoading ? (
          <RingLoader
            size={25}
            color={'white'}
            loading={isLoading}
          />
        ) : (
          'Update Your Password'
        )}
      </button>
    </form>
  );

  return (
    <div className={styles.container}>
      {PassowordUpdate}
    </div>
  );
}

export default Password;
