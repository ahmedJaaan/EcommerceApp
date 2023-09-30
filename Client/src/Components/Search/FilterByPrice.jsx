import React from 'react';
import { Menu, Slider } from 'antd';

const { SubMenu } = Menu;

const FilterByPrice = ({ handleSlider, price }) => {
  return (
    <div>
      <SubMenu key="sub1" title="Filter By Price" style={{width: "100%", backgroundColor: "aquamarine", padding: "10px"}}>
          <Slider
            style={{
              marginLeft: '20px',
              marginRight: '20px',
              marginTop: '20px',
              width: '200px',
            }}
            range
            tipFormatter={(value) => `$${value}`}
            value={price}
            onChange={handleSlider}
            max={5000}
            trackStyle={{ backgroundColor: 'blue' }}
          />
      </SubMenu>
    </div>
  );
};

export default FilterByPrice;
