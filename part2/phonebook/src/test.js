import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      ...(isFound === true && alert( `The name ${newName} already exits to the phone book`)),
      ...(isFound === false &&  {name:newName}),
      ...({number:newNumber}),
    } 

    axios
    .post('http://localhost:3001/persons', personObj)
    .then(response => {
      console.log(response)
    })


    // setPersons(persons.concat(personObj))
    // setNewName('')
    // setNewNumber('')
  }

  const isFound = persons.some(element => {
    // Use's the some array function to check's if the name exists in the persons array array.
    // It also checks if the name's spelled with capitals,
    // it only looks if the first name is capitalized 
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
          
          <Filter value={searchTerm} 
                  handleChange={(event)=> handleInputFilter(event)}
                  />
        </div>

        <h2>Contacts</h2>
      <Persons searchTerm={searchTerm} 
               persons={persons} />
      

      <h2>Add a new contact</h2>
      <Form submitEntry={addPerson}
            name={newName} 
            handleName={(event) => handleNameChange(event)}
            number={newNumber}
            handleNumber={(event) => handleNumberChange(event)}
      />
     
    </div>
  )
}
export default App