import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../APIs/product';
import { useSelector } from 'react-redux';
import ProductUpdateForm from '../../../Components/Forms/ProductUpdateForm';
import { getCategories, getCategorySub } from '../../../APIs/Category';
import { toast } from 'react-toastify';


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
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");   
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
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        toast.success(`${res.title} is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        }
      })  
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
      setValues({ ...values, subs: [] });
      
      
      setSelectedCategory(e.target.value);
      
      
      
      getCategorySub(e.target.value)
        .then((response) => {
          setSubOptions(response);
        })
        .catch((error) => {
          console.error('Error loading subcategories:', error);
        });
      
      if(values.category._id === e.target.value) {
        loadProduct();
      }
      setArrayOfSubs([]);
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
        arrayOfSubs={arrayOfSubs}
        setArrayOfSubs={setArrayOfSubs}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ProductUpdate;
