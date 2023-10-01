import React, { useState } from "react";
import styles from "./FilterMenu.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
import { AiOutlineDollar } from "react-icons/ai";
import FilterByStars from "./FilterByStars";
import FilterBySub from "./FilterBySub";

const FilterMenu = ({
  price,
  handleSlider,
  categories,
  handleCheck,
  categoriesIds,
  handleStarClick,
  subs,
  handleSub,
}) => {
  const [isPriceListVisible, setPriceListVisible] = useState(false);
  const [isCategoryListVisible, setCategoryListVisible] = useState(false);
  const [isStarRatingVisible, setStarRatingVisible] = useState(false);
  const [isSubsVisible, setSubsVisible] = useState(false);
  const togglePriceListVisibility = () => {
    setPriceListVisible(!isPriceListVisible);
  };

  const toggleCategoryListVisibility = () => {
    setCategoryListVisible(!isCategoryListVisible);
  };

  const toggleStarRatingVisibility = () => {
    setStarRatingVisible(!isStarRatingVisible);
  };

  const toggleSubsVisibility = () => {
    setSubsVisible(!isSubsVisible);
  };

  return (
    <div>
      <h4 style={{ textAlign: "center", fontWeight: "400", fontSize: "20px" }}>
        Filter
      </h4>
      <FilterByPrice
        styles={styles}
        handleSlider={handleSlider}
        price={price}
        togglePriceListVisibility={togglePriceListVisibility}
        isPriceListVisible={isPriceListVisible}
      />
      <FilterByCategory
        toggleCategoryListVisibility={toggleCategoryListVisibility}
        styles={styles}
        isCategoryListVisible={isCategoryListVisible}
        categories={categories}
        handleCheck={handleCheck}
        categoriesIds={categoriesIds}
      />
      <FilterByStars
        toggleStarRatingVisibility={toggleStarRatingVisibility}
        styles={styles}
        isStarRatingVisible={isStarRatingVisible}
        handleStarClick={handleStarClick}
      />
      <FilterBySub
        toggleSubsVisibility={toggleSubsVisibility}
        styles={styles}
        isSubsVisible={isSubsVisible}
        subs={subs}
        handleSub={handleSub}
      />
    </div>
  );
};

export default FilterMenu;
