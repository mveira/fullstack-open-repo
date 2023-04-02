import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState()
  const [newNumber, setNewNumber] = useState()
  const [searchTerm, setSearchTerm] = useState()

  
  useEffect(() => {
      console.log('effect')
      personsService    
          .getAll()      
          .then( initialPerson => {
                console.log('promise fulfilled') 
                setPersons(initialPerson)
        })
  },[]) 
 
  const addPerson = (persons) => {
    console.log('add person')
    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    personsService
    .create(newPersonObj)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    } )  
  }

  const updatePerson = (id, persons) => {
    console.log('update person')
    const person = persons.find(p => p.id === id)

    console.log("person =", person)
    if(window.confirm( `${newName} already exists in the phone book would uou like to update the number ?`)){  
      //create a copy of a person object with the change number
      const changedNumber = {...person, number: newNumber}
      //update number with person service 
      personsService
      .update(id, changedNumber)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response))
        setNewName("")
        setNewNumber("")
      })
    } 
      
  }

  const addNewPersonHandler = (event) => {
    console.log('addNewPersonHandler')
      event.preventDefault()
    const person = persons.find(person => person.name === newName)
      person ? updatePerson(person.id, persons): addPerson(persons)
        //update number
  }

  const handleDelete = (id) => {
    if (window.confirm( `Are you sure you want to delete ?`)){
        personsService 
        .del(id)
        .then(() => {
        setPersons(persons.filter(p => p.id !== id))   
    })
    }
  }

  const handleNameFilter = (event) => {   
      setSearchTerm(event.target.value)  
  }

  const handleNameChange = (event) => {  
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const PersonsToShow = !searchTerm
  ? persons
  : persons.filter(person => person.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                            )
  
  return (
  <>  
      <h2>Phone book</h2>

      <SearchFilter 
          searchTerm={searchTerm} 
          handleChange={(event)=> handleNameFilter(event)}
        /> 
  
      
      <h3>Add a new</h3>
    
       <AddPersonForm
           submitPerson={addNewPersonHandler}
           name={newName}
           number={newNumber}
           nameChangeHandler={handleNameChange}
           numberChangeHandler={handleNumberChange}
           
       />

      <h3>Numbers</h3>

      <Persons persons={PersonsToShow}
               onDelete={handleDelete}
              />
  </>
  )
  }

  export default App
  