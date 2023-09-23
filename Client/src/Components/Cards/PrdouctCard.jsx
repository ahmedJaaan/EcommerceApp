import React from 'react'
import {Card} from "antd"
import {MdOutlineViewInAr} from "react-icons/md"
import {FaOpencart} from "react-icons/fa"
import defaultImg from "../../assets/5191452-200.png";
import { NavLink } from 'react-router-dom';
import styles from "./ProductCard.module.css"


const { Meta } = Card



const PrdouctCard = ({product}) => {
  const { title, description, images, slug } = product;

  return (
    <div>
      <Card
        cover={<img src={images && images.length ? images[0].url : defaultImg}
          alt={title}
          style={{ height: "200px", objectFit: "cover", borderRadius: "10px", }}
        />}
        actions={[
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
            <div 
            className={styles.userIcon}
            style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <NavLink to={`/admin/product/${slug}`}>
            <MdOutlineViewInAr
              key="edit"
              size={25}
              style={{ color: "blue", marginLeft: "50px" }}
            />
            <br />
            <span style={{flexDirection: "column", marginLeft: "50px", color: "blue"}}>View Product</span>
            </NavLink>
            </div>
            <>
            <div
            className={styles.userIcon} 
            style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <FaOpencart
              key="delete"
              size={25}
              style={{ color: "red", marginLeft: "150px" }}
            />
            <span style={{flexDirection: "column", marginLeft: "150px", color: "red"}}>Add to Cart</span>
            </div>
            </>
          </div>
        ]}
        >
        <Meta title={title} description={`${description && description.substring(0, 100)}...`} />

      </Card>
    </div>
  )
}

export default PrdouctCard