import React from "react";

const Person = ({ person,toggleDelete }) => {
    // console.log(persons)
    // console.log(persons.name)
    // const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    // console.log(test)
    return (
        <div>
            {person.name} {person.number}
            <button onClick={toggleDelete}>Delete</button>
        </div>
    )
}

export default Person