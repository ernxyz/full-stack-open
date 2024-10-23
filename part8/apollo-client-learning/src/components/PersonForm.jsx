import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ALL_PERSONS, CREATE_PERSON } from "../queries";

import { updateCache } from "../App";

const PersonForm = (props) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join("\n")
      props.setError(messages)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
    }
  })

  const submit = (e) => {
    e.preventDefault()

    createPerson({ variables: { name, street, city,
      phone: phone.length > 0 ? phone : undefined  
     }})

    setName("")
    setPhone("")
    setCity("")
    setStreet("")
  }

  return (
    <div>
      <h2>Add Person</h2>
      <form onSubmit={submit}>
        <div>
          name: <br />
          <input value={name} onChange={({target}) => setName(target.value)} />
        </div>
        <div>
          phone: <br />
          <input value={phone} onChange={({target}) => setPhone(target.value)} />
        </div>
        <div>
          city: <br />
          <input value={city} onChange={({target}) => setCity(target.value)} />
        </div>
        <div>
          street: <br />
          <input value={street} onChange={({target}) => setStreet(target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm