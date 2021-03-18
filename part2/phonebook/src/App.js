import React, { useState } from 'react'
import Persons from "./components/Persons";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toShow, setToShow] = useState('')

  const addName = (event) => {
    event.preventDefault()
    // console.log(newName)
    // console.log(persons.map(person => person.name))
    // const names = persons.map(person => person.name)
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is alreay added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(nameObject))
      setNewNumber('')
      setNewName('')
      // setToShow('')
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setToShow(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={toShow} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={toShow} />
    </div>
  )
}

export default App