import React from 'react';
import SideBar from './Sidebar';
import styles from "./Nav.module.css";
import { NavLink } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiUserPin } from "react-icons/bi";
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';


const Header = () => {

  const logout = () => {

  }
  return (
    <div className={styles.flexContainer}>
      <SideBar />
      <div className={styles.navLinkContainer}>
        <NavLink to="/register" className={styles.link}>
          <AiOutlineUserAdd size={32} style={{ color: 'blue' }} />
          Register
        </NavLink>
        <NavLink to="/login" className={styles.link}>
          <BiUserPin size={32} style={{ color: 'blue' }} />
          Login
        </NavLink>
        <NavLink to="/login" className={styles.link}>
          <BiUserPin size={32} style={{ color: 'blue' }} />
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
