import { useState, useEffect } from 'react'
import peopleService from './services/people.js'

import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import People from './components/People.jsx'
import Notification from './components/Notification.jsx'

const App = () => {

  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({content: null, type: null})

  useEffect(() => {
    peopleService
      .getAll()
      .then(people => {
        setPeople(people)
      })
  }, [])  

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNameCap = capitalizeName(newName)

    const newNumberTrimed = trimNumber(newNumber);

    if (newNameCap != '' && newNumberTrimed != '' ) {
      if(people.every(person => person.name != newNameCap)) {

        if (people.every(person => person.number != newNumberTrimed)) {

          const personToAdd = {
            name: newNameCap,
            number: newNumberTrimed,
            id: people.length + 1
          }

          peopleService
            .create(personToAdd)
            .then(person => {
              setPeople([...people, person])
              setNewName('')
              setNewNumber('')

              // notification
              handleNotification(`"${personToAdd.name}" was added successfully!`, "success")
            })

        } else {
          alert(`${newNumberTrimed} is already in the list!`)
        }

      } else {

          if (window.confirm(`${newNameCap} is already in the list, do you want to update their phone number?`)) {
            let personToUpdate = people.find(person => person.name === newNameCap)

            personToUpdate = {
              ...personToUpdate,
              number: newNumberTrimed
            }

            peopleService
              .update(personToUpdate.id, personToUpdate)
              .then(updatedPerson => {
                setPeople(people.map(person => (
                  person.id != updatedPerson.id
                  ? person
                  : updatedPerson
                )))

                setNewName('')
                setNewNumber('')

                handleNotification(`the phone number for "${personToUpdate.name}" was updated!`, "success")

              })
              .catch(error => {

                handleNotification(`${personToUpdate.name} was already removed from the server`, "error")()

                setPeople(people.filter(person => (person.id != personToUpdate.id)))
              })
          }
      }
    } else {
        alert("insert both values")
    }
  }
  
  const handleDelete = (id) => {
    if (window.confirm("are you sure to delete this contact?")){

      const personToDelete = people.find(person => person.id == id)

      const newPeople = people.filter(person => person.id != personToDelete.id)

      peopleService
        .remove(personToDelete.id)
        .then(() => {
          setPeople(newPeople)
          handleNotification(`${personToDelete.name} was deleted!`, "success")
        })
    }
  }

  const handleFilter = (e) => {

    const newValue = e.target.value
    
    setNewFilter(newValue)
    
    const filtered = []
    
    if(newValue != ''){
      let regexp = new RegExp(`^${newValue}`, 'i')

      people.forEach(person => {
        if(regexp.test(person.name)){
          filtered.push(person)
        }
      })
    }

    setFilteredPeople([
      ...filtered
    ])
  }

  const handleNotification = (message, type) => {
    setNotificationMessage({content: message,type: type})

    setTimeout(() => {
      setNotificationMessage({content: null, type: null})
    }, 5000);
  }

  const capitalizeName = name => {

    let copy = new String(name)

    return copy
      .split(' ')
      .filter(word => word != '')
      .map(word => {
        word = word[0].toUpperCase().concat(word.slice(1).toLowerCase())
        return word
      })
      .join(' ')
  }

  const trimNumber = number => {
    let copy = new String(number)
    
    return copy.trim()
  }

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter 
        newFilter={newFilter}
        handleFilter={handleFilter}
      />
      <h3>Add a new contact</h3>
      <Form 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <People
        peopleToShow={newFilter ? filteredPeople : people}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App