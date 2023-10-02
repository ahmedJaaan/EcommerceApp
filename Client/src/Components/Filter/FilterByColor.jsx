import React from "react";
import { TbColorFilter } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterByColor = ({
  styles,
  handleColor,
  color,
  toggleColorVisibility,
  isColorVisible,
}) => {
  return (
    <>
      <button onClick={toggleColorVisibility} className={styles.button}>
        <TbColorFilter /> Filter By Color
        <span
          className={`${styles.dropdownIcon} ${
            isColorVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isColorVisible
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
            placeholder="Search Color"
            value={color}
            onChange={(e) => handleColor(e.target.value)}
            className={styles.colorAndBrandInput}
          />
        </li>
      </ul>
    </>
  );
};

export default FilterByColor;
