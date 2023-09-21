import React from 'react'
import {Card} from "antd";

const {Meta} = Card;

const AdminCard = ({product}) => {
    const {title, description, images} = product;
  return (
    <div>
        <Card 
        cover={<img src={images && images.length ? images[0].url : ""} 
        alt={title} 
        style={{height: "200px", objectFit: "cover", borderRadius: "10px", }}
        />}
        >
        <Meta title={title} description={description} />
        </Card>
    </div>
  )
}

export default AdminCard