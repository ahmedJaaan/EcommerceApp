import React from 'react'
import {NavLink} from 'react-router-dom'



const ProductItemList = ({product}) => {
  const {price} = product
  return (
    <div>
      {price}
    </div>
  )
}

export default ProductItemList