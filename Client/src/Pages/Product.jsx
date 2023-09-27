import React, {useEffect, useState} from 'react'
import {getProduct, productStars} from "../APIs/product"
import { useParams } from 'react-router-dom'
import SingleProduct from '../Components/Cards/SingleProduct'
import { useSelector } from 'react-redux'

const Product = () => {
    const [product, setProduct] = useState({})
    const {slug} = useParams();
    const [star, setStar] = useState(0);
    const {user } = useSelector((state) => state);   
    useEffect(() => {
        loadSingleProduct();
        // console.log(slug)
    
    }, [slug]);

    const onStarClick = (id, newRating) => {
      console.log("rarrararar", newRating)
      setStar(newRating)
      productStars(id, newRating, user.token).then((res) => {
        console.log(res);
        loadSingleProduct();
      })
      // console.log(id, newRating)
    }

    const loadSingleProduct = async () => {
        const product = await getProduct(slug)
        setProduct(product)
    }
  return (
    <>
        <SingleProduct product={product} onStarClick={onStarClick} star={star} />
    </>
  )
}

export default Product