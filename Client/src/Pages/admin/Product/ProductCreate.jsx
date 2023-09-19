import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../APIs/product';
import styles from './Product.module.css';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import { getCategories } from '../../../APIs/Category';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: 'Yes', 
  quantity: '',
  images: [],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    color,
    brand,
  } = values;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.title} is created`);
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productContainer}>
      <h1 className={styles.productsHeading}>Create Product</h1>
      <h4 className={styles.productsSubHeading}>Category</h4>

      <div className={styles.dropdownContainer}>
        <select
          id="categoryDropdown"
          className={styles.categoryDropdown}
          onChange={handleChange}
          name="category"
          value={category}
        >
          <option value="">Select Category</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem._id} value={categoryItem._id}>
              {categoryItem.name}
            </option>
          ))}
        </select>
      </div>

      <h4 className={styles.productsSubHeading}>Title</h4>
      <input
        name="title"
        type="text"
        value={title}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Description</h4>
      <input
        name="description"
        type="text"
        value={description}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Price</h4>
      <input
        name="price"
        type="text"
        value={price}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Quantity</h4>
      <input
        name="quantity"
        type="text"
        value={quantity}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Color</h4>
      <input
        name="color"
        type="text"
        value={color}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Brand</h4>
      <input
        name="brand"
        type="text"
        value={brand}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Shipping</h4>
      <select
        className={styles.shippingDropdown}
        value={shipping}
        onChange={handleChange}
        name="shipping"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <br />
      <button className={styles.productButton} disabled={loading}>
        {loading ? (
          <RingLoader size={25} color={'white'} loading={loading} />
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
};

export default ProductCreate;
