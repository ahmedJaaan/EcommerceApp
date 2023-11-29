import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { getCoupons, create, removeCoupon } from "../../../APIs/coupon";
import styles from "../../../Styles/coupon.module.css";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationPopup from "../../../Components/Popup/Popup";
import { RingLoader } from "react-spinners";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [coupon, setCoupon] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    create({ name, discount, expiry }, user.token)
      .then((res) => {
        toast.success(`${res.name} is created`);
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        setIsTyping(false);
        loadCoupons();
      })
      .catch((err) => {
        console.log("Error in creating coupon", err);
        toast.error("An error occurred.");
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadCoupons = () => {
    getCoupons().then((res) => {
      setCoupon(res);
    });
  };

  const openDeleteConfirmation = (couponId) => {
    setCouponToDelete(couponId);
    setDeleteConfirmationOpen(true);
  };

  const handleDelete = (couponId) => {
    openDeleteConfirmation(couponId);
  };

  const handleDeleteConfirmation = () => {
    if (couponToDelete) {
      removeCoupon(couponToDelete, user.token)
        .then((res) => {
          toast.info(`${res.name} is deleted`);
          loadCoupons();
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred.");
        });
    }
    setDeleteConfirmationOpen(false);
    setCouponToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setCouponToDelete(null);
  };

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Create Coupon</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4 className={styles.h4}>Coupon Code</h4>
        <input
          type="text"
          placeholder="Coupon Code"
          value={name}
          onChange={(e) => {
            setIsTyping(true);
            setName(e.target.value.toUpperCase());
          }}
          className={styles.input}
          required
        />
        {isTyping && (name.length < 6 || name.length > 12) ? (
          <p
            className={`${styles.error} ${
              isTyping &&
              (name.length < 6 || name.length > 12) &&
              styles["error-message"]
            }`}
          >
            Coupon Code Should be At least 6 Characters and Maximum 12
          </p>
        ) : null}
        <br />
        <h4 className={styles.h4}>Discount%</h4>
        <input
          type="Number"
          placeholder="Discount You Wanna Give?"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className={styles.input}
          required
        />
        <br />
        <h4 className={styles.h4}>Pick Expiry Date</h4>
        <DatePicker
          selected={new Date()}
          value={expiry}
          onChange={(date) => setExpiry(date)}
          placeholderText="Select Date"
          className={styles.input}
          required
        />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className={styles.btn}
            disabled={
              name.length < 6 ||
              name.length > 12 ||
              discount.length < 1 ||
              expiry === ""
            }
          >
            {loading ? (
              <RingLoader size={20} color={"#fff"} />
            ) : (
              "Create Coupon"
            )}
          </button>
        </div>
      </form>
      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Coupon Name</th>
              <th scope="col">Discount</th>
              <th scope="col">Expiry</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {coupon &&
              coupon.length > 0 &&
              coupon.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.discount}%</td>
                  <td>{formatDate(p.expiry)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className={styles.deleteBtn}
                    >
                      <RiDeleteBin6Line />
                    </button>
                    {isDeleteConfirmationOpen && couponToDelete === p._id && (
                      <ConfirmationPopup
                        message={`Are you sure you want to delete this "${p.name}" coupon?`}
                        onConfirm={handleDeleteConfirmation}
                        onCancel={handleDeleteCancel}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateCoupon;
