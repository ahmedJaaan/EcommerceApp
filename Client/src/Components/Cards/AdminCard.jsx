import React, { useState } from "react";
import { Card } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgEditUnmask } from "react-icons/cg";
import styles from "../../Styles/cards.module.css";
import defaultImg from "../../assets/5191452-200.png";
import ConfirmationPopup from "../Popup/Popup";
import { removeProduct } from "../../APIs/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const { Meta } = Card;

const AdminCard = ({ product, loadAllProducts }) => {
  const { title, description, images, slug } = product;
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
  };

  const handleConfirmDelete = () => {
    removeProduct(slug, user.token)
      .then((res) => {
        // console.log(res);
        toast.info(`${res.title} is deleted`);
        setIsDeletePopupVisible(false);
        loadAllProducts();
      })
      .catch((err) => {
        console.log(err);
        setIsDeletePopupVisible(false);
        toast.error("An error occurred.");
      });
  };

  const handleCancelDelete = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <div>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImg}
            alt={title}
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NavLink to={`/admin/product/${slug}`}>
              <CgEditUnmask
                key="edit"
                size={20}
                style={{ color: "blue", marginLeft: "100px" }}
                className={styles.AdminIcon}
              />
            </NavLink>
            <RiDeleteBin6Line
              key="delete"
              size={35}
              style={{ color: "red", marginLeft: "150px" }}
              className={styles.AdminIcon}
              onClick={handleDeleteClick}
            />
          </div>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 100)}...`}
        />
      </Card>
      {isDeletePopupVisible && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this product named" ${title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default AdminCard;
