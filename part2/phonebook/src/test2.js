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

    const addNewPerson = () => {
      // check if name name exists in phone book
        if (persons.find(p => p.Newname)){
          
            // if exists prompt user to update number
            if(window.confirm( `${newName} already exists in the phone book would uou like to update the number ?`)){
                // find person
                const person = persons.filter(p => p.Newname)
        
                //create a copy of a person object with the change number
                const changedNumber = {...person, number: newNumber}
        
                //update number with person service 
                personsService
                .update(person.id, changedNumber)
                .then(response => {
                  setPersons(persons.map(person => !person.id ? person : response.data))
                })
        }     
      }
      else{
      // create new person object 
      addPerson()
      
      }
      
      const addPerson = (event) => {
          event.preventDefault()
          const personObj = {
              name: newName,
              number: newNumber
          }

          personsService
          .create(personObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
         })
      }

      }
    }

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