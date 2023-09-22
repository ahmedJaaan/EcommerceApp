import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../../APIs/product';
import { useSelector } from 'react-redux';
import ProductUpdateForm from '../../../Components/Forms/ProductUpdateForm';
import { getCategories, getCategorySub } from '../../../APIs/Category';

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

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubs] = useState([]);
  const { user } = useSelector((state) => state);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((product) => {
        setValues({ ...values, ...product });
        getCategorySub(product.category._id)
          .then((response) => {
            setSubOptions(response);
          });
        const arr = product.subs.map((item) => item._id);
        setArrayOfSubs(arr);
      })
      .catch((err) => {
        console.error('Error loading product:', err);
      });
  };

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setCategories(c);
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your product update logic here
  };
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId) { 
      setValues({ ...values, subs: [], category: selectedCategoryId });
      getCategorySub(selectedCategoryId)
        .then((response) => {
          setSubOptions(response);
        })
        .catch((error) => {
          console.error('Error loading subcategories:', error);
        });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        values={values}
        setValues={setValues}
        categories={categories}
        subOptions={subOptions}
        arrayOfSubs={arrayOfSubIds}
        setArrayOfSubs={setArrayOfSubs}
      />
    </div>
  );
};

export default ProductUpdate;
