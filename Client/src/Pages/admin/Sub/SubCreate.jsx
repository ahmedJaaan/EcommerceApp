import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from '../../../APIs/Category';
import { createSub, removeSub, getSubs } from '../../../APIs/Sub';
import styles from '../Admin.module.css';
import ConfirmationPopup from '../../../Components/Popup';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { RingLoader } from "react-spinners";

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [categoryNameToDelete, setCategoryNameToDelete] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subs, setSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubs()
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        // console.log('Categories:', res);
        setCategories(res);
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
      });
  };


  
  const loadSubs = () => {
    getSubs()
      .then((res) => {
        console.log('Categories:', res);
        setSubs(res);
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
      });
  };

  const handleRemove = async (slug, categoryName) => {
    setCategoryToDelete(slug);
    setShowConfirmation(true);
    setCategoryNameToDelete(categoryName);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const confirmDelete = () => {
    setDeleteLoading(true);
    removeSub(categoryToDelete, user.token)
      .then((res) => {
        setDeleteLoading(false);
        toast.info(`${res.name} is deleted`);
        setShowConfirmation(false);
        loadSubs();
      })
      .catch((err) => {
        console.error(err);
        setDeleteLoading(false);
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error('An error occurred.');
        }
      });
  };

  const cancelDelete = () => {
    setCategoryToDelete('');
    setShowConfirmation(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error('Please select a parent category for the subcategory.');
      return;
    }

    setLoading(true);

    createSub( {name, parent: selectedCategory}, user.token)
      .then((res) => {
        toast.success(`${res.name} is created`);
        setLoading(false);
        setName('');
        loadSubs();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error('An error occurred.');
        }
      });
  };

  return (
    <div className={`${styles.categoryCreateContainer} ${styles.textCenter} ${styles.mt30}`}>
      <h2 className={`${styles.categoryCreateHeading}`}>Select Category</h2>
      <div className={styles.dropdownContainer}>
        <select
          id="categoryDropdown"
          className={styles.categoryDropdown}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
        <option>Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <h1 className={`${styles.categoryCreateHeading}`}>Create Sub Category</h1>
      <CategoryForm
        handleSubmit={handleSubmit}
        styles={styles}
        name={name}
        setName={setName}
        loading={loading}
        placeholder="Enter Sub Category name"
        buttonName="Create Sub Category"
      />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} styles={styles} />
      <hr />
      <ul>
      {subs.filter(searched(keyword)).map((s) => (
          <li key={s._id} className={styles.container}>
            <span className={styles.categoryName}>{s.name}</span>
            <Link to={`/admin/sub/${s.slug}`} className={styles.icon}>
              <CiEdit size={20} />
            </Link>
            <span className={styles.deleteicon} onClick={() => handleRemove(s.slug, s.name)}>
              {deleteLoading ? (
                <RingLoader color={'#ffffff'} loading={true} size={15} /> 
              ) : (
                <GoTrash size={20} />
              )}
            </span>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <ConfirmationPopup
          message={`Are you sure you want to delete the Sub Category "${categoryNameToDelete}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default SubCreate;
