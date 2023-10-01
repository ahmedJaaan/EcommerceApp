import React from "react";
import Stars from "./Stars";
import { AiOutlineStar } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
const FilterByStars = ({
  toggleStarRatingVisibility,
  isStarRatingVisible,
  styles,
  handleStarClick,
}) => {
  return (
    <>
      <button onClick={toggleStarRatingVisibility} className={styles.button}>
        <AiOutlineStar size={23} /> Filter By Rating
        <span
          className={`${styles.dropdownIcon} ${
            isStarRatingVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isStarRatingVisible
            ? styles["slide-in-out"]
            : `${styles["slide-in-out"]} ${styles.hidden}`
        }`}
      >
        <li
          className={styles.listItem}
          style={{
            display: "flex",
            flexDirection: "column", // Set to column layout
            position: "relative",
            listStyle: "none",
            margin: 0,
            padding: 0,
            backgroundColor: "#fff",
          }}
        >
          <div>
            <Stars starClick={handleStarClick} numberOfStars={5} />
          </div>
          <div>
            <Stars starClick={handleStarClick} numberOfStars={4} />
          </div>
          <div>
            <Stars starClick={handleStarClick} numberOfStars={3} />
          </div>
          <div>
            <Stars starClick={handleStarClick} numberOfStars={2} />
          </div>
          <div>
            <Stars starClick={handleStarClick} numberOfStars={1} />
          </div>
        </li>
      </ul>
    </>
  );
};

export default FilterByStars;
