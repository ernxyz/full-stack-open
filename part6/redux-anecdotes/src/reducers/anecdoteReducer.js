import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../service/anecdotes"

const noteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload

      state.push(content)
    },
    voteAction(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)

      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(a => 
        a.id === updatedAnecdote.id
        ? updatedAnecdote
        : a
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, appendAnecdote, setAnecdotes } = noteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const addedNote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(addedNote))
  }
}

export const voteAsync = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.addVote(id)
    dispatch(voteAction(updatedAnecdote.id))
  }
}

export default noteSlice.reducer