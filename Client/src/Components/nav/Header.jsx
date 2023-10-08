import React from "react";
import SideBar from "./Sidebar";
import styles from "../../Styles/Nav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiUserPin } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import AdminSideBar from "./AdminSideBar";
import Search from "../Filter/Search";

const Header = ({ path }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    signOut(auth).then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      toast.info("You have Logged out");
      navigate("/login");
    });
  };

  return (
    <div className={path === "/" ? styles.HomeGradient : styles.flexContainer}>
      {user && user.role === "admin" ? (
        <AdminSideBar path={path} />
      ) : (
        <SideBar path={path} />
      )}
      <div className={styles.centeredSearch}>
        <Search path={path} />
      </div>
      <div className={styles.navLinkContainer}>
        {!user && (
          <>
            <NavLink to="/register" className={styles.link}>
              <AiOutlineUserAdd
                size={32}
                style={{ color: path === "/" ? "white" : "blue" }}
              />
              <span style={{ color: path === "/" ? "white" : "blue" }}>
                Register
              </span>
            </NavLink>
            <NavLink to="/login" className={styles.link}>
              <BiUserPin
                size={32}
                style={{ color: path === "/" ? "white" : "blue" }}
              />
              <span style={{ color: path === "/" ? "white" : "blue" }}>
                Login
              </span>
            </NavLink>
          </>
        )}
        {user && (
          <button
            className={styles.logoutButton}
            style={{ border: "none" }}
            onClick={logout}
          >
            <FiLogOut
              size={32}
              style={{ color: path === "/" ? "white" : "blue" }}
            />
            <span style={{ color: path === "/" ? "white" : "blue" }}>
              Logout
            </span>
          </button>
        )}
        {/* Center the Search component horizontally */}
      </div>
    </div>
  );
};

export default Header;
