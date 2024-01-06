import React from 'react'

const People = ({ peopleToShow, handleDelete }) => {
  return (
    <ul>
      {
      peopleToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>)
      )}
    </ul>
  );
}

export default People