import { useQuery, useSubscription } from "@apollo/client"

import { ALL_BOOKS, BOOK_ADDED, GENRES } from "../queries"
import { useState } from "react"

// const updateCache = (cache, query, addedBook) => {

//   const uniqByName = (a) => {
//     let seen = new Set()
//     return a.filter((item) => {
//       let k = item.name
//       return seen.has(k) ? false : seen.add(k)
//     })
//   }

//   cache.updateQuery(query, ({ allBooks }) => {
//     return {
//       allBooks: uniqByName(allBooks.concat(addedBook)),
//     }
//   })
// }

const Books = () => {

  const [ genre, setGenre ] = useState(null)

  let result = useQuery(ALL_BOOKS)

  let filterResult = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  const genresResult = useQuery(GENRES)

  // SUBSCRIPTION

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded

      console.log(`${addedBook.title} was added`)

      // updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  //

  if (result.loading || genresResult.loading) {
    return <div>Loading...</div>
  }

  if (result.error|| genresResult.error) {
    return <div>PRESS F5</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!genre && result.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
          {genre && filterResult.data && filterResult.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
          {genresResult.data.genres.map(g => (
            <button 
              key={g}
              onClick={() => setGenre(g)}  
            >{g}</button>
          ))}

          <button
            onClick={() => setGenre(null)}
          >clear filter</button>
      </div>
    </div>
  )
}

export default Books
