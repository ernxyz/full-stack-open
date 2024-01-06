import React from 'react'

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div>
      search: <br /> <input value={newFilter} onChange={handleFilter} />
    </div>
  )
}

export default Filter;