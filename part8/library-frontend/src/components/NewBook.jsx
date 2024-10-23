import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, GENRES } from '../queries'
import { useNavigate } from 'react-router-dom'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: GENRES }]
  })

  const submit = async (event) => {
    event.preventDefault()

    const publishedAux = Number(published)

    addBook({ variables: {title, author, published: publishedAux, genres} })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    navigate("/books")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>new book</h2>
      <form onSubmit={submit}>
        <div>
          title <br />
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <br />
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <br />
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre <br />
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <br />
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook