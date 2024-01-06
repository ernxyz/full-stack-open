import React from "react"

const List = ({ countriesToShow, showInfo }) => {

  const msg = 'too many matches, be more specific'

  const list = countriesToShow.map((country, id) => {
    return <li key={id}>{country} <button onClick={() => showInfo(country)}>Show</button></li>
  }) 

  const toShow = countriesToShow.length > 10 ? msg : list 

  return (
    <ul>
      {toShow}
    </ul>
  )
}

export default List