import { useSelector, useDispatch } from "react-redux";
import { voteAsync } from "../reducers/anecdoteReducer";
import { notificate } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== "") {
      const regexg = RegExp(`${filter}`, "gi")

      const filtered = []

      anecdotes.forEach(a => {
        if (regexg.test(a.content)) {
          filtered.push(a)
        }
      })

      return filtered
    }

    const toSort = [...anecdotes]
    
    return toSort.sort((a, b) => b.votes - a.votes)    
  })

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    
    dispatch(notificate(`Vote added for: "${votedAnecdote.content}"`, 5))

    dispatch(voteAsync(id))
  }
  
  return (
    <>
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList