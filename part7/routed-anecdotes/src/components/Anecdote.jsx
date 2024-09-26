const Anecdote = ({ anecdote }) => (
  <div>
    <div><h3>{anecdote.content}</h3></div>
    <div><i>has {anecdote.votes} votes</i></div>
    <div><h5>by: {anecdote.author}</h5></div>
    <div><a href={anecdote.url}>more info here</a></div>
  </div>
) 

export default Anecdote