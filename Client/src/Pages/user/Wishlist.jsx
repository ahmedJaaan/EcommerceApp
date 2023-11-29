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
import { Card } from "antd";
import { LuView } from "react-icons/lu";
import ConfirmationPopup from "../../Components/Popup/Popup.jsx";

const { Meta } = Card;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
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
  const handleRemoveClick = (e, productId) => {
    e.preventDefault();
    setProductIdToRemove(productId);
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      removeFromWishlist(user.token, productIdToRemove)
        .then((res) => {
          loadWishList();
          console.log("Product removed from wishlist:", res);
          toast.success("Product removed from wishlist");
        })

        .catch((error) => {
          console.error("Error removing from wishlist: ", error);
        });
    }
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "400", fontSize: "40px" }}>
        Wishlist
      </h1>
      <div className={styles.wishListContainer}>
        {wishlist.map((product) => (
          <div key={product._id}>
            <Card
              hoverable
              cover={
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              }
              actions={[
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between ",
                    alignItems: "center",
                  }}
                >
                  <NavLink to={`/product/${product.slug}`}>
                    <LuView
                      size={25}
                      color="blue"
                      className={styles.viewButton}
                    />
                  </NavLink>
                  <button
                    onClick={(e) => handleRemoveClick(e, product._id)}
                    className={styles.removeBtn}
                  >
                    <MdRemoveCircleOutline size={25} />
                  </button>
                </div>,
              ]}
            >
              <Meta
                title={product.title}
                description={`${product.description
                  .trim()
                  .substring(0, 50)}...`}
              />
            </Card>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to remove this product from your wishlist?"
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Wishlist;
