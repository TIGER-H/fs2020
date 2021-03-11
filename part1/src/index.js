import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleEvent, text}) =>{
  return(
    <button onClick = {handleEvent}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0) 
  const [voted, setVoted] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0)

  const handleClickEvent = () =>{
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const handleVoteEvent = () => {
    const cpy = {...voted}
    cpy[selected] += 1
    setVoted(cpy)
    if(voted[selected] >= voted[mostVoted]){
      setMostVoted(selected)
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {voted[selected]} votes</p>
      <Button handleEvent = {handleVoteEvent} text = "vote" />
      <Button handleEvent = {handleClickEvent} text = "next anecdote" />
      <h1>Anecdote w/ most votes</h1>
      {props.anecdotes[mostVoted]}
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