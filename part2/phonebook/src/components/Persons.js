import React from "react";

const Persons = ({ persons, filter }) => {
    // console.log(persons)
    // console.log(persons.name)
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    // console.log(test)
    return (
        <div>
            {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons