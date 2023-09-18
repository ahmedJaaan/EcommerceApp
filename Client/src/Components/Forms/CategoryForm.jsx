import React from 'react'
import { RingLoader } from 'react-spinners'

const CategoryForm = ({handleSubmit, styles, name, setName, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter Category Name'
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
        <button className={`${styles.categoryCreateButton}`}>Create Category</button>
      )}
    </form>
  )
}

export default CategoryForm