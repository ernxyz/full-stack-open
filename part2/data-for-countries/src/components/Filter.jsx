import React from "react"

const Filter = ({ filterValue, handleFilter }) => {


  return (
    <>
    find countries: <input type="text" value={filterValue} onChange={handleFilter} />
    </>
  )
}

export default Filter