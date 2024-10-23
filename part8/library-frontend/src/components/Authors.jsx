import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import BornYear from "./BornYear"

const Authors = ({ token }) => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.error) {
    return <div>PRESS F5</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && <BornYear persons={result.data.allAuthors} />}
    </div>
  )
}

export default Authors
