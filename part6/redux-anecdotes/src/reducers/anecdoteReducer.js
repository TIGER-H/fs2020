const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT':
      return action.data

    default:
      return state
  }
}

export const newVote = (id) => ({
  type: 'VOTE',
  data: { id: id },
})

export const newAnecdote = (data) => ({
  type: 'NEW_ANECDOTE',
  data
})

export const initialAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default reducer
