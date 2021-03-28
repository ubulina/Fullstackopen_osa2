import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Input from './components/Input'
import personService from './services/persons'
import Notification from './components/Notification'
import Errorinfo from './components/Errorinfo'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    //koostetaan listalla olevista nimistä erillinen lista
    const names = persons.map(person => person.name)
   
    //aiemmin lisätty nimi ei saa olla nimilistalla
    //ehto joka tarkistetaan ennen persons-listalle lisäämistä
    if(!names.includes(newName)){

      const personObject = {
        name: newName,
        number: newNumber,
        
      }  

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setInfoMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
          
    }

    else {

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const name = newName
        const person = persons.find(p => p.name === name)
        const id = person.id 
        
        //kutsu numeron päivittävälle funktiolle
        changeNumber(id, newNumber)

        setNewName('')
        setNewNumber('')


      }

      setNewName('')
      setNewNumber('')

    }
          
  }

  const changeNumber = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(id, changedPerson)

      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))

        setInfoMessage(
          `Updated '${newNumber}'`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })

      .catch(error => {
        setErrorMessage(
         `Information of '${person.name}' has already been removed from server`
        )
        //ajastin asettaa 5 sek. kuluttua errormessagen arvoksi null
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
  
      })


  }


  //funktio, joka poistaa henkilön palvelimelta ja näkymästä  
  const personToErase = (id) => {

    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name}?`)) {

      personService
      .remove(person.id)
      .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
      })
      setInfoMessage(
        `Removed '${person.name}'`
      )
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)


    }

  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
   


  return (
    <div>
      <h2> Phonebook </h2>
      <Notification message={infoMessage} />
      <Errorinfo errorMessage={errorMessage} />
        <Filter 
          value={newFilter}
          onChange={handleFilter}
        />

      <h2> add a new</h2>

        <form onSubmit={addPerson}>

          <Input 
            text='name'
            value={newName}  
            onChange={handleNameChange}  
          />
            
          <Input 
            text='number'
            value={newNumber}  
            onChange={handleNumberChange}  
          /> 
          
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      <h2> Numbers</h2>
        
        {personsToShow.map(person => 
          <Person 
            key={person.name} 
            person={person} 
            erasePerson={() => personToErase(person.id)}
          />
        )}
      
    </div>
  )
}


export default App;
