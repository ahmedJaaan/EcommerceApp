import React, {useEffect, useState} from 'react'
import {getProduct} from "../APIs/product"
import { useParams } from 'react-router-dom'
import SingleProduct from '../Components/Cards/SingleProduct'

const Product = () => {
    const [product, setProduct] = useState({})
    const {slug} = useParams()
    
    useEffect(() => {
        loadSingleProduct();
        console.log(slug)
    
    }, [slug])


    const loadSingleProduct = async () => {
        const product = await getProduct(slug)
        setProduct(product)
    }
  return (
    <>
        <SingleProduct product={product}/>
    </>
  )
}

export default Product