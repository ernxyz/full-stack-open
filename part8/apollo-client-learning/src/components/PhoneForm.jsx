import { useEffect, useState } from "react"
import { ALL_PERSONS, UPDATE_CONTACT } from "../queries"
import { useMutation } from "@apollo/client"

export default function PhoneForm ({ setError }) {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [ changeNumber, result ] = useMutation(UPDATE_CONTACT, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons}) => {
        
        const updatedPerson = response.data.editNumber

        return {
          allPersons: allPersons.map(p => p.name !== updatedPerson.name ? p : updatedPerson)
        }
      })
    }
  })

  const submit = (e) => {
    e.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName("")
    setPhone("")
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null){
      setError("person not found")
    }
  }, [result.data])

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <input type="text"  value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone:
          <input type="text"  value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  )
}