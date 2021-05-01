import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    clear
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = (resource) => {
    // ...
    axios.post(baseUrl, resource).then(
      response => {
        setResources(resources.concat(response.data))
      }
    )
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.input.value })
    content.clear()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.input.value, number: number.input.value })
    name.clear()
    number.clear()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br />
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App