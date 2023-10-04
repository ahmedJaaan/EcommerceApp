import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import defaultImg from "../../assets/5191452-200.png";
import { toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";
import { CgUnavailable } from "react-icons/cg";
import { IoMdRemove } from "react-icons/io";
const ProductCardInCheckOut = ({ p, styles }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`${p.title} has max of ${p.quantity} in stock`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p && p.images && p.images.length ? (
              <ModalImage
                key={p._id}
                small={p.images[0].url}
                large={p.images[0].url}
                alt={p.title}
              />
            ) : (
              <div style={{ width: "100px", height: "auto" }}>
                <ModalImage
                  small={defaultImg}
                  large={defaultImg}
                  alt={p.title}
                />
              </div>
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>{p.color}</td>
        <td>
          <input
            type="number"
            value={p.count}
            onChange={handleQuantityChange}
            style={{ width: "50px" }}
            className={styles.countInput}
          />
        </td>
        <td>
          {p.shipping === "Yes" ? (
            <FiCheckCircle size={35} color="green" />
          ) : (
            <CgUnavailable size={40} color="red" />
          )}
        </td>
        <td>
          <button onClick={handleRemove} className={styles.removeBtn}>
            <IoMdRemove size={20} color="#fff" />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckOut;
