import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import Input from './components/Input'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll] = useState(true)

  useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
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

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

    }

    else {

      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')

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
        <Person key={person.name} person={person} />
        )}
      
    </div>
  )
}


export default App;
