import React from "react";
import FilterByPrice from "./FilterByPrice";
import { Menu, Slider } from "antd";
import FilterByCategory from "./FilterByCategory";

const SearchMenu = ({ handleSlider, price, categories }) => {
  return (
    <div>
      <Menu mode="inline" style={{ width: "100%", border: "none" }}>
        <h4
          style={{
            marginBottom: "31px",
            marginTop: "46px",
            fontWeight: "400",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Search/Filter
        </h4>
        <FilterByPrice handleSlider={handleSlider} price={price} />
        <FilterByCategory categories={categories} />
      </Menu>
    </div>
  );
};

export default SearchMenu;
