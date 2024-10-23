import { useMutation } from "@apollo/client"
import { useState } from "react"

import { EDIT_BORN } from "../queries"

import Select from "react-select"

const BornYear = ({ persons }) => {

  const [authorToUpdate, setAuthorToUpdate] = useState("")
  const [bornYear, setBornYear] = useState("")

  const [ updateBornYear, result ] = useMutation(EDIT_BORN)

  const handleSubmit = (e) => {
    e.preventDefault()

    const bornYearInt = Number(bornYear)

    updateBornYear({ variables: { name: authorToUpdate.value, setBornTo: bornYearInt } })

    setAuthorToUpdate("")
    setBornYear("")
  }

  const optionsToSelect = persons.map(p => ({
    value: p.name, label: p.name.toUpperCase()
  }))

  return (
    <div>
      <h2>update phone</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name to update: <br />
          
          <Select 
            value={authorToUpdate}
            onChange={setAuthorToUpdate}
            options={optionsToSelect}
          />
        </div>
        <div>
          born year: <br />
          <input value={bornYear} onChange={({ target }) => setBornYear(target.value)} />
        </div>
        <br />
        <div>
          <button type="submit">update</button>
        </div>
      </form>
    </div>
  )
}

export default BornYear