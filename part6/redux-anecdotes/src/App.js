import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import ConnectedFilter from './components/ConnectedFilter'
import ConnectedAnecdoteForm from './components/ConnectedForm'
import ConnectedList from './components/ConnectedList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialAnecdotes())
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      {/* <Filter /> */}
      <ConnectedFilter />
      {/* <AnecdoteList /> */}
      <ConnectedList />
      {/* <AnecdoteForm /> */}
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App
