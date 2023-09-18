import React from 'react'

const LocalSearch = ({keyword, setKeyword, styles}) => {
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
      }
  return (
    <div>
    <input
        type='Search'
        placeholder='Filter'
        value={keyword}
        onChange={handleSearchChange}
        className={styles.categoryInput}
       />
    </div>
  )
}

export default LocalSearch