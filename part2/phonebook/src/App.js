import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add new name')
  const [newNumber, setNewNumber] = useState('Add new number')
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfiled')
      setPersons(response.data)
    })
  },[])
  
  const addName = (event) => {
    event.preventDefault()
    const personObj = {
      ...(isFound === true && alert( `${newName} is already added to the phonebook breh`)),
      ...(isFound === false &&  {name:newName}),
      ...({number:newNumber}),
    } 
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  const isFound = persons.some(element => {
    // Use's the some array function to check's if the name exists in the persons array array.
    // It also cheacks if the name's spelled with capitals,
    // it only looks if the first name is capatalised 
    if (element.name === newName) {
      return true
    }
    return false
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputFilter = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <Filter value={searchTerm} 
                                     handleChange={(event)=> handleInputFilter(event)}/>
        </div>
      <h2>Add a new contact</h2>
      <Form submitEntry={addName}
            name={newName} 
            handleName={handleNameChange}
            number={newNumber}
            handleNumber={ handleNumberChange}
      />
      <Persons searchTerm={searchTerm} 
               persons={persons} />
      
    </div>
  )
}
export default App