import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishList,
  addToWishlist,
  removeFromWishlist,
} from "../../APIs/user";
import styles from "../../Styles/History.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveCircleOutline } from "react-icons/md";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () => {
    getWishList(user.token)
      .then((res) => {
        setWishlist(res.wishlist);
      })

      .catch((error) => {
        console.error("Error loading wishlist: ", error);
      });
  };

  const handleRemoveFromWishlist = (e, productId) => {
    e.preventDefault();
    removeFromWishlist(user.token, productId)
      .then((res) => {
        loadWishList();
        console.log("Product removed from wishlist:", res);
        toast.success("Product removed from wishlist");
      })
      .catch((error) => {
        console.error("Error removing from wishlist: ", error);
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "400", fontSize: "40px" }}>
        Wishlist
      </h1>
      {wishlist.map((product) => (
        <div key={product._id} className={styles.wishListContainer}>
          <NavLink to={`/product/${product.slug}`} className={styles.nav}>
            {product.title}
          </NavLink>
          <button
            onClick={(e) => handleRemoveFromWishlist(e, product._id)}
            className={styles.removeBtn}
          >
            <MdRemoveCircleOutline size={25} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
