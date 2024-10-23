import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "../queries"

const Recommended = () => {

  const favoriteGenre = useQuery(ME)
  const booksByFavoriteGenre = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre.data?.me?.favoriteGenre },
    skip: !favoriteGenre.data || favoriteGenre.loading
  })
  
  if (favoriteGenre.loading || booksByFavoriteGenre.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books according to your favorite genre</h2>
      <h3><i>{favoriteGenre.data.me.favoriteGenre}</i></h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByFavoriteGenre.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended