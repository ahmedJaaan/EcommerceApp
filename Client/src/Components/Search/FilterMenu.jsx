import React, { useState } from "react";
import styles from "./FilterMenu.module.css";

import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";
const FilterMenu = ({
  price,
  handleSlider,
  categories,
  handleCheck,
  categoriesIds,
}) => {
  const [isPriceListVisible, setPriceListVisible] = useState(true);
  const [isCategoryListVisible, setCategoryListVisible] = useState(true);
  const togglePriceListVisibility = () => {
    setPriceListVisible(!isPriceListVisible);
  };

  const toggleCategoryListVisibility = () => {
    setCategoryListVisible(!isCategoryListVisible);
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
    </div>
  );
};

export default FilterMenu;
