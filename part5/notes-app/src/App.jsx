import noteService from './services/notes.js'
import loginService from './services/login.js'

import { useState, useEffect, useRef } from 'react'

import Note from './components/Note.jsx'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import NoteForm from './components/NoteForm.jsx'

const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }

  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (e) {

      setPassword('')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const toggleImportanceOf = id => {

    const noteToUpdate = notes.find(n => n.id === id)
    const updatedNote = { ...noteToUpdate, important: !noteToUpdate.important }

    noteService
      .update(id, updatedNote)
      .then(recentEditedNote => {
        setNotes(notes.map(n => n.id !== id ? n : recentEditedNote))
      })
      .catch(error => {

        console.log(error.message)
        setErrorMessage(
          `the note "${noteToUpdate.content}" was already removed`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(note => note.id !== id))
      })

  }

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const recentAdded = await noteService.create(noteObject)
    setNotes(notes.concat(recentAdded))
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const notesForm = () => (
    <Togglable buttonLabel="add note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p><button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          { notesForm() }
        </div>
      }

      <br />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.map((note) => (
            <Note key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))
        }
      </ul>
      <Footer />
    </div>
  )
}

export default App
