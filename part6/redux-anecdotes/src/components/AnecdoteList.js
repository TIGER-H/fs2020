import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(newVote(anecdote.id, votedAnecdote))
    dispatch(show(`You voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
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

export default AnecdoteList
