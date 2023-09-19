import React from 'react'
import { RingLoader } from 'react-spinners'

const CategoryForm = ({handleSubmit, styles, name, setName, loading, placeholder, buttonName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder={placeholder}
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
        className={`${styles.categoryInput}`}
      />
      <br />
      {loading ? (
        <button className={`${styles.categoryCreateButton}`} disabled>
          <RingLoader color={'#ffffff'} loading={true} size={20} />
        </button>
      ) : (
        <button className={`${styles.categoryCreateButton}`}>{buttonName}</button>
      )}
    </form>
  )
}

export default CategoryForm