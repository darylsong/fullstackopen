import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecdoteMostVotes = (props) => {


}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0)
  )
  const [mostVotes, setMostVotes] = useState(0)

  const generateNumber = () => {
    return Math.round(Math.random() * (props.anecdotes.length - 1))
  }

  const getMostVotes = (listOfVotes) => {
    let highestVotes = 0;
    for (let i = 0; i < listOfVotes.length; i++) {
      if (listOfVotes[i] > listOfVotes[highestVotes]) {
        highestVotes = i
      }
    }
    return highestVotes
  }

  const nextAnecdote = () => {
    setSelected(generateNumber)
  }

  const voteForAnecdote = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected]++
    setVotes(copyOfVotes)
    setMostVotes(getMostVotes(copyOfVotes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={voteForAnecdote}>
        vote
      </button>
      <button onClick={nextAnecdote}>
        next anecdote
      </button>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[mostVotes]}
      <br />
      has {votes[mostVotes]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
