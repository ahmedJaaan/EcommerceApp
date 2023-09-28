import React, {useState, useEffect} from 'react'
import {getProductsByCount} from "../../APIs/product";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "../Cards/ProductCard";
import styles from './Shop.module.css';
import { fetchProductByFilter } from '../../APIs/product';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const {search} = useSelector((state) => ({...state}));
    const {text} = search;

    const dispatch = useDispatch();

    useEffect(() => {
        loadAllProducts();
    }, []);

    useEffect(() => {
        fetchProducts({query: text});
    }, [text])
    
    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
            .then(res => {
                setProducts(res);
            })
        .catch(err => {
            console.log("Error in fetching products filter",err);
        })
    }

    const loadAllProducts = () => {
        getProductsByCount(12)
            .then(p => {
                // console.log(data);
                setProducts(p);
            })
            .catch(err => {
                console.log(err);
            });
    };

  return (
    <>

    <div className={styles.containerStyle}>
        <div>
            {products && products.length < 1 && <h1>`No Products Found`</h1>}
            <div className={styles.productGrid}>
            {products && products.map((p) => (
                <div key={p._id} className={styles.productGridItem}>
                    <ProductCard product={p} />
                </div>
            ))}
            </div>
        </div>
        <div>
            Search
        </div>
    </div>
    </>
  )
}

export default Shop