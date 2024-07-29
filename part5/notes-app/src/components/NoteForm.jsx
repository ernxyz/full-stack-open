import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    e.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          data-testid="note"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NoteForm