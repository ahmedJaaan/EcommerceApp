import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory, getCategories, removeCategory } from '../../../APIs/Category';
import styles from '../Admin.module.css';
import { RingLoader } from 'react-spinners';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { GoTrash } from 'react-icons/go';
import ConfirmationPopup from '../../../Components/Popup';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false); 
  const [categoryNameToDelete, setCategoryNameToDelete] = useState(''); 
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c));

  const handleRemove = async (slug, categoryName) => {
    setCategoryToDelete(slug);
    setShowConfirmation(true);
    setCategoryNameToDelete(categoryName); 
  };

 

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)


  const confirmDelete = () => {
    setDeleteLoading(true); 
    removeCategory(categoryToDelete, user.token)
      .then((res) => {
        setDeleteLoading(false); 
        toast.info(`${res.name} is deleted`);
        loadCategories();
        setShowConfirmation(false);
      })
      .catch((err) => {
        console.log(err);
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
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        toast.success(`${res.name} is created`);
        setLoading(false);
        setName('');
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
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
      <h1 className={`${styles.categoryCreateHeading}`}>Create Category</h1>
      <CategoryForm
      handleSubmit={handleSubmit}
      styles={styles}
      name={name}
      setName={setName}
      loading={loading}
      buttonName="Create Category"
       />
       <LocalSearch 
       keyword={keyword} 
       setKeyword={setKeyword}
       styles={styles}
       />
      <hr />
      <ul>
        {categories.filter(searched(keyword)).map((c) => (
          <li key={c._id} className={styles.container}>
            <span className={styles.categoryName}>{c.name}</span>
            <Link to={`/admin/category/${c.slug}`} className={styles.icon}>
              <CiEdit size={20} />
            </Link>
            <span className={styles.deleteicon} onClick={() => handleRemove(c.slug, c.name)}>
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
          message={`Are you sure you want to delete the category "${categoryNameToDelete}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}           
          />
          )}
    </div>
  );
};

export default CategoryCreate;
