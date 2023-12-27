import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })

  function getRandomAnecdote () {
    const i = Math.floor(Math.random() * ((anecdotes.length - 1) + 1));

    if (i == selected) {
      getRandomAnecdote();
    }

    setSelected(i);
  }

  function getMostVoted (){

    // mostVoted[0] represents the key of the most voted anecdote and mostVoted[1] represents the amount of votes
    let mostVoted = [0,0];

    for (let key in points){

      if (points[key] > mostVoted[1]) {
        mostVoted[0] = key;
        mostVoted[1] = points[key];
      }
    }

    return anecdotes[mostVoted[0]];
  }

  function handlePoints (i) {
    
    const pointsCopy = {...points};

    pointsCopy[i] += 1; 

    const newPoints = () => setPoints(pointsCopy);

    console.log(points);

    return newPoints;
  }

  return (
    <>
    <div><h1>Anecdote of the day</h1></div>
    <div>
      {anecdotes[selected]} <br />
      has {points[selected]} votes
    </div>
    <button onClick={handlePoints(selected)}>
      vote
    </button>
    <button onClick={getRandomAnecdote}>
      next
    </button>
    <br />
    <div><h1>Most voted anecdote</h1></div>
    <div>
      {getMostVoted()}
    </div>
    </>
  )
}

export default App