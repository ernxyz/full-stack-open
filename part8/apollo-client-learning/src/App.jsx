import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import LoginForm from "./components/LoginForm"

import { ALL_PERSONS, PERSON_ADDED } from "./queries"
import { useState } from "react"
import PhoneForm from "./components/PhoneForm"

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

function App() {

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  if (result.loading) {
    return <div>Loading...</div>
  }
  
  if (result.error) {
    return <div>Press F5</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </>
  )
}

export default App
