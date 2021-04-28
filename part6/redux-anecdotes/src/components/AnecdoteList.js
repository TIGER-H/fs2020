import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(newVote(anecdote.id))
    dispatch(show(`You voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
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
