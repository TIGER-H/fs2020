import React, { useState, useEffect } from 'react'
import Person from "./components/Person";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import pbService from "./services/pb";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toShow, setToShow] = useState('')

  useEffect(() => {
    pbService
      .getAll()
      .then(initPbs => {
        setPersons(initPbs)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    // console.log(newName)
    // console.log(persons.map(person => person.name))
    // const names = persons.map(person => person.name)
    if (persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is alreay added to phonebook, replace it?`)){
        pbService
       .update(persons.find(person=>person.name === newName).id, {name:newName, number:newNumber})
        .then(response => {
          let index = persons.findIndex(person => person.id === response.id);
          let copy = [...persons]
          copy.splice(index, 1, response)
          setPersons(copy)
          alert(`Updated ${response.name}'s number`)
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      pbService
        .create(nameObject)
        .then(returnedPb =>{
          setPersons(persons.concat(returnedPb))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const toggleDeleteOf = person =>{
    if(window.confirm(`delete ${person.name} ?`)){
      pbService
      .deleteOne(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
      }) 
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(toShow.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={toShow} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {/* <Persons persons={personsToShow} filter={toShow} /> */}
      <div>
        {personsToShow.map(person=>
            <Person key={person.id} person={person} toggleDelete={()=>toggleDeleteOf(person)}/>
        )}
      </div>
    </div>
  )
}

export default App