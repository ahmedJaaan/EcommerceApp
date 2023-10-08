import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCategory, getCategory } from "../../../APIs/Category";
import styles from "../../../Styles/auth.module.css";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

const CategoryUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(slug)
      .then((category) => {
        setName(category.name);
      })
      .catch((err) => {
        console.error("Error loading category:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(slug, { name }, user.token)
      .then((res) => {
        toast.success(`${res.name} is updated`);
        setLoading(false);
        setName("");
        navigate("/admin/category");
      })
      .catch((err) => {
        console.error("Error updating category:", err);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred.");
        }
      });
  };

  return (
    <div
      className={`${styles.categoryCreateContainer} ${styles.textCenter} ${styles.mt30}`}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.headingForRegistration}>Update Category</h1>

        <input
          type="text"
          value={name}
          className={styles.inputForRegistration}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          placeholder="Enter Category Name to update"
        />
        <button
          type="submit"
          className={styles.registrationButton}
          disabled={loading}
        >
          {loading ? (
            <RingLoader size={25} color={"white"} loading={loading} />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
