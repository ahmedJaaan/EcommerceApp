import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/FilterMenu.module.css";
const Search = ({ path }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const { text } = search;
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  let searchStyle;
  if (path === "/") {
    searchStyle = styles.homeSearch;
  } else if (path === "/user/history" || path === "/admin/dashboard") {
    searchStyle = styles.historySearch;
  } else {
    searchStyle = styles.searchInput;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={text}
          onChange={handleChange}
          placeholder="Search Products"
          className={searchStyle}
        />
      </form>
    </div>
  );
};

export default Search;
