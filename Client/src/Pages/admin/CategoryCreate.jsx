import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory, getCategories, removeCategory } from "../../APIs/Category";
import styles from "./Admin.module.css";
import { RingLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c));

  const handleRemove = async(slug) => {
    if(window.confirm("Delete")) {
      setLoading(true)
      removeCategory(slug, user.token)
      .then(res => {
        setLoading(false)
        toast.info(`${res.name} is deleted`)
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred.");
        }
      });
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        toast.success(`${res.name} is created`);
        setLoading(false);
        setName("");
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred.");
        }
      });
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter Category Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
        className={`${styles.categoryInput}`}
      />
      <br />
      {loading ? (
        <button className={`${styles.categoryCreateButton}`} disabled>
          <RingLoader color={'#ffffff'} loading={true} size={20} />
        </button>
      ) : (
        <button className={`${styles.categoryCreateButton}`}>Create Category</button>
      )}
    </form>
  );

  return (
    <div className={`${styles.categoryCreateContainer} ${styles.textCenter} ${styles.mt30}`}>
      <h1 className={`${styles.categoryCreateHeading}`}>Create Category</h1>
      {categoryForm()}
      <hr />
      <ul>
        {categories.map((c) => (
          <li key={c._id} className={styles.container}>
            <span className={styles.categoryName}>{c.name}</span>
            <Link 
            to={`/admin/category/${c.slug}`} 
            className={styles.icon}
            >
              <CiEdit size={20}/>
            </Link>
            <span
            className={styles.deleteicon}
            onClick={() => handleRemove(c.slug)}
            >
              <GoTrash size={20}/>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCreate;
