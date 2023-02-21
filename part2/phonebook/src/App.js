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

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObj = {
      ...(isFound === true && alert( `The name ${newName} already exits to the phone book`)),
      ...(isFound === false &&  {name:newName}),
      ...({number:newNumber}),
    } 
    
    personsService 
            .create(personObj)
            .then(returnedPerson => {
                console.log('promise fulfilled', returnedPerson) 
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                
            })
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

    const handleDelete = (id) => {
      console.log('deleting...')
      if (window.confirm( `Are you sure you want to delete ?`)) {
      
          personsService 
          .del(id)
          .then(() => {
          console.log('promise fulfilled. Person deleted') 
          setPersons(persons.filter(p => p.id !== id))
          
      })
      }
            
    }

  const handleUpdate = () => {
    
  }

  const handleNameFilter = (event) => {   
      console.log(event.target.value)    
      setSearchTerm(event.target.value)  
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)   
    setNewNumber(event.target.value)
  }

  const PersonsToShow = !searchTerm
  ? persons
  : persons.filter(person => 
          person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
  <>  
      <h2>Phone book</h2>
      <SearchFilter 
          searchTerm={searchTerm} 
          handleChange={(event)=> handleNameFilter(event)}
        /> 
  
      <Persons persons={PersonsToShow}
               onDelete={handleDelete}
              />
    
       <AddPersonForm
           submitPerson={handleAddPerson}
           name={newName}
           number={newNumber}
           nameChangeHandler={handleNameChange}
           numberChangeHandler={handleNumberChange}
           
       />
  </>
  )
  }

  export default App
  