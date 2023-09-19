import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../APIs/product';
import { toast } from 'react-toastify';
import { getCategories, getCategorySub } from '../../../APIs/Category';
import ProductForm from '../../../Components/Forms/ProductForm';


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
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  
  const { user } = useSelector((state) => ({ ...state }));
  
  
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
        // console.log(res);
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

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySub(e.target.value)
      .then((response) => {
        const subId = response; 
        setSubOptions(subId);
        // console.log(subId);
      })
      .catch((error) => {
        console.error('Error loading subcategories:', error);
      });
      setShowSub(true);
  }
  

  
    return (
      <div>
        <ProductForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          values={values}
          setValues={setValues}
          categories={categories}
          loading={loading}
          setShowSub={setShowSub}
          showSub={showSub}
          subOptions={subOptions}
        />
      </div>
    );
  }
  

export default ProductCreate;
