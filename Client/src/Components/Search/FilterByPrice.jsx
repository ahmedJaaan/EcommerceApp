import React from "react";
import { Menu, Slider } from "antd";

const { SubMenu } = Menu;

const FilterByPrice = ({ handleSlider, price }) => {
  return (
    <SubMenu
      title="Filter By Price"
      style={{
        width: "100%",
        backgroundColor: "lightblue",
        padding: "10px",
        margin: 0,
        marginBottom: "20px",
      }}
    >
      <Slider
        style={{
          marginTop: "50px",
          marginLeft: 0,
          width: "200px",
        }}
        range
        tipFormatter={(value) => `$${value}`}
        value={price}
        onChange={handleSlider}
        max={5000}
        trackStyle={{ backgroundColor: "blue" }}
      />
    </SubMenu>
  );
};

export default FilterByPrice;
