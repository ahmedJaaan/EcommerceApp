import React from 'react';
import SideBar from './Sidebar';
import styles from "./Nav.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiUserPin } from "react-icons/bi";
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FiLogOut } from "react-icons/fi"
import { useSelector } from 'react-redux';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => ({...state}));

  const logout = () => {
    signOut(auth).then(
      dispatch({
        type: "LOGOUT",
        payload: null,
      }),
        toast.info("You have Logged out"),
        navigate("/login")
      )
  }
  return (
    <div className={styles.flexContainer}>
      <SideBar />
      <div className={styles.navLinkContainer}>
      {!user && (
        <>
        <NavLink to="/register" className={styles.link}>
          <AiOutlineUserAdd size={32} style={{ color: 'blue' }} />
          Register
        </NavLink>
        <NavLink to="/login" className={styles.link}>
          <BiUserPin size={32} style={{ color: 'blue' }} />
          Login
        </NavLink>
        </>
      )}
      {user && (
        <button 
        className={styles.logoutButton} 
        style={{border: 'none'}}
        onClick={logout}
        >
          <FiLogOut size={32} style={{ color: 'blue' }} />
          Logout
        </button>
        )}
      </div>
    </div>
  );
}

export default Header;
