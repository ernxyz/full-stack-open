import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0).toString()


const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createAnecdote = async (content) => {
  const obj = {
    content,
    votes: 0,
    id: getId()
  }

  const res = await axios.post(baseUrl, obj)
  return res.data
}

const addVote = async (id) => {
  let { data: anecdotes } = await axios.get(baseUrl)
  
  const toUpdate = anecdotes.find(a => a.id === id)

  const updatedAnecdote = {
    ...toUpdate,
    votes: toUpdate.votes + 1
  }

  const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)

  return res.data
}

export default {
  getAll,
  createAnecdote,
  addVote,
}