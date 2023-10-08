import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSub, getSub } from "../../../APIs/Sub";
import styles from "../../../Styles/auth.module.css";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../APIs/Category";

const CategoryUpdate = () => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
      });
  };

  const loadSub = () => {
    getSub(slug)
      .then((res) => {
        setName(res.name);
        setParent(res.parent);
      })
      .catch((err) => {
        console.error("Error loading subcategory:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        toast.success(`${res.name} is updated`);
        setLoading(false);
        setName("");
        setParent("");
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.error("Error updating Sub category:", err);
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
        <h1 className={styles.headingForRegistration}>Update Sub Category</h1>
        <div className={styles.dropdownContainer}>
          <select
            id="categoryDropdown"
            className={styles.categoryDropdown}
            onChange={(e) => setParent(e.target.value)}
            value={parent}
          >
            <option>Select Category</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                selected={category._id === parent}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={name}
          className={styles.inputForRegistration}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          placeholder="Enter Subcategory Name to update"
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
