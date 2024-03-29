import React, { Children, useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

const StarRatingPopup = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  const handleModal = () => {
    if (user && user.token) {
      setVisible(true);
    } else {
      navigate("/login", {
        state: {
          from: `/product/${slug}`,
        },
      });
    }
  };
  return (
    <>
      <div onClick={handleModal} style={{ cursor: "pointer" }}>
        <AiOutlineStar size={32} style={{ color: "blue" }} />
        <br />
        {user ? "leave Rating" : "Login to leave Rating"}
      </div>
      <Modal
        title="Leave Rating"
        centered
        open={visible}
        onOk={() => {
          setVisible(false), toast.success("Thank You For Your Rating");
        }}
        onCancel={() => setVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default StarRatingPopup;
