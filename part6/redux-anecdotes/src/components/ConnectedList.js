import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const filter = props.filter
  const anecdotes = props.anecdotes

  const vote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    props.newVote(anecdote.id, votedAnecdote)
    props.setNotification(`You voted ${anecdote.content}`, 5)
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  newVote,
  setNotification,
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedList
