import React, { useState } from "react";
import { PiCalendarCheckBold } from "react-icons/pi";
import { Checkbox } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterByCategory = ({
  toggleCategoryListVisibility,
  styles,
  isCategoryListVisible,
  categories,
  handleCheck,
  categoriesIds,
}) => {
  return (
    <>
      <button onClick={toggleCategoryListVisibility} className={styles.button}>
        <PiCalendarCheckBold /> Filter By Category
        <span
          className={`${styles.dropdownIcon} ${
            isCategoryListVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isCategoryListVisible
            ? styles["slide-in-out"]
            : `${styles["slide-in-out"]} ${styles.hidden}`
        }`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 0,
        }}
      >
        {categories.map((c) => (
          <li
            className={`${styles.listItem} ${styles.listItemCategory}`}
            key={c._id}
          >
            <div>
              <Checkbox
                value={c._id}
                name="category"
                onChange={handleCheck}
                checked={categoriesIds.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterByCategory;
