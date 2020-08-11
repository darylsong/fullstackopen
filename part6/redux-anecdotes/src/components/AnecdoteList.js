import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const anecdotesToShow = () => {
    const anecdotes = props.anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
    })

    anecdotes.sort(function(first, second) {
      return second.votes - first.votes
    })

    return anecdotes
  }

  const addVote = async (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => addVote(anecdote)}/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList