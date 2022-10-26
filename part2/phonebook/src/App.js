import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

import { useState } from 'react'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('Add new name')
  const [newNumber, setNewNumber] = useState('Add new number')
  const [searchTerm, setSearchTerm] = useState("")
  
  const addName = (event) => {
    event.preventDefault()
    const personObj = {
      ...(isFound === true && alert( `${newName} is already added to the phonebook breh`)),
      ...(isFound === false &&  {name:newName}),
      ...({number:newNumber}),
    } 
    setPersons(persons.concat(personObj))
    setNewName('Add new name')
    setNewNumber('Add new number')
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

  console.log(searchTerm)

  
  const filteredPersons = !searchTerm
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()) )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <Filter value={searchTerm} 
                                     handleChange={(event)=> handleInputFilter(event)}/>
        </div>
      <h2>Add a new</h2>
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