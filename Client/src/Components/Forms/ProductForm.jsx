import React from "react";
import { RingLoader } from "react-spinners";
import styles from "../../Pages/admin/Product/Product.module.css";
import { Select } from "antd";
import FileUpload from "./FileUpload";
const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  categories,
  loading,
  setValues,
  setShowSub,
  showSub,
  subOptions,
}) => {
  const {
    title,
    description,
    price,
    images,
    category,
    subs,
    shipping,
    quantity,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit} className={styles.productContainer}>
      <h1 className={styles.productsHeading}>Create Product</h1>
      <h4 className={styles.productsSubHeading}>Category</h4>

      <div className={styles.dropdownContainer}>
        <select
          id="categoryDropdown"
          className={styles.shippingDropdown}
          onChange={handleCategoryChange}
          name="category"
          value={category}
        >
          <option>Select Category</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem._id} value={categoryItem._id}>
              {categoryItem.name}
            </option>
          ))}
        </select>
      </div>

      {showSub && (
        <>
          <h4 className={styles.productsSubHeading}>Sub Category</h4>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Sub Category"
            value={subs}
            name="subs"
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            <Option value="">Select Sub Category</Option>
            {subOptions.map((subItem) => (
              <Option key={subItem._id} value={subItem._id}>
                {subItem.name}
              </Option>
            ))}
          </Select>
        </>
      )}

      <FileUpload values={values} setValues={setValues} images={images} />

      <h4 className={styles.productsSubHeading}>Title</h4>
      <input
        name="title"
        type="text"
        value={title}
        placeholder="Enter Product Title"
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Description</h4>
      <input
        name="description"
        type="text"
        value={description}
        placeholder="Enter Product Description"
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Price</h4>
      <input
        name="price"
        type="number"
        value={price}
        placeholder="Enter Product Price"
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Quantity</h4>
      <input
        name="quantity"
        type="number"
        value={quantity}
        placeholder="Enter Product Quantity"
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Color</h4>
      <input
        name="color"
        type="text"
        value={color}
        placeholder="Enter Product Color"
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Brand</h4>
      <input
        name="brand"
        type="text"
        placeholder="Enter Product Brand"
        value={brand}
        onChange={handleChange}
        className={styles.productInput}
      />
      <h4 className={styles.productsSubHeading}>Shipping</h4>
      <select
        className={styles.shippingDropdown}
        value={shipping}
        onChange={handleChange}
        name="shipping"
      >
        <option>Please select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <br />
      <button className={styles.productButton} disabled={loading}>
        {loading ? (
          <RingLoader size={25} color={"white"} loading={loading} />
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
};

export default ProductForm;
