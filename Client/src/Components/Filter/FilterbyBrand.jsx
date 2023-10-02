import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbBrand4Chan } from "react-icons/tb";
const FilterbyBrand = ({
  toggleBrandVisibility,
  isBrandVisible,
  brand,
  handleBrand,
  styles,
}) => {
  return (
    <>
      <button onClick={toggleBrandVisibility} className={styles.button}>
        <TbBrand4Chan /> Filter By Brand
        <span
          className={`${styles.dropdownIcon} ${
            isBrandVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isBrandVisible
            ? styles["slide-in-out"]
            : `${styles["slide-in-out"]} ${styles.hidden}`
        }`}
      >
        <li
          className={styles.listItem}
          style={{
            position: "relative",
            listStyle: "none",
            margin: 0,
            padding: 0,
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            placeholder="Search By Brand"
            value={brand}
            onChange={(e) => handleBrand(e.target.value)}
            className={styles.colorAndBrandInput}
          />
        </li>
      </ul>
    </>
  );
};

export default FilterbyBrand;
