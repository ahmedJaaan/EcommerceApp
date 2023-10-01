import React from "react";
import { Slider } from "antd";
import { AiOutlineDollar } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterByPrice = ({
  handleSlider,
  price,
  togglePriceListVisibility,
  isPriceListVisible,
  styles,
}) => {
  return (
    <>
      <button onClick={togglePriceListVisibility} className={styles.button}>
        <AiOutlineDollar /> Filter By Price
        <span
          className={`${styles.dropdownIcon} ${
            isPriceListVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isPriceListVisible
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
          <Slider
            style={{ width: "100%", backgroundColor: "#fff" }}
            range
            tipFormatter={(value) => `$${value}`}
            value={price}
            onChange={handleSlider}
            max={5000}
          />
        </li>
      </ul>
    </>
  );
};

export default FilterByPrice;
