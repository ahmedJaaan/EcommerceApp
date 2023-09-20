import React from 'react'
import styles from '../../Pages/admin/Product/Product.module.css';

const FileUpload = () => {

    const fileUploadAndResize = (e) => {
        
    }

  return (
    <>
  <h4 className={styles.productsSubHeading}>Upload Image</h4>
  <div className={styles.uploadContainer}>
    <label htmlFor="fileInput" className={styles.uploadLabel}>
      Choose Image
    </label>
    <input
      type="file"
      id="fileInput"
      multiple
      accept="image/*"
      onChange={fileUploadAndResize}
      className={styles.imageUploadInput}
    />
  </div>
</>

  )
}

export default FileUpload