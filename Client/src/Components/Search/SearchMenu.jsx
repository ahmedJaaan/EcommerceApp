import React from 'react'
import FilterByPrice from './FilterByPrice'
import {Menu, Slider} from "antd"
import FilterByCategory from './FilterByCategory'


const SearchMenu = ({handleSlider, price, categories}) => {
  return (
    <div>
        <h4>Search/Filter</h4>
            <Menu mode="inline" style={{width: "100%", border: "none"}} >
            <FilterByPrice handleSlider={handleSlider} price={price}/>
            <FilterByCategory categories={categories}/>
        </Menu>
    </div>
  )
}

export default SearchMenu