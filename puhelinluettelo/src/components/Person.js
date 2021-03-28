import React from 'react'

const Person = ({ person, erasePerson }) => {
    return (
       <div>
            {person.name + " "} 
            {person.number + " "}
            <button onClick={erasePerson}>delete</button>
        </div>
       
    )
}

export default Person
