import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Persons from './components/Persons'
import Filter from './components/SearchFilter'
import Form from './components/AddPersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState('')
 

  useEffect(() => {
      console.log('effect')
      personsService    
          .getAll()      
          .then( initialPerson => {
                // console.log('promise fulfilled') 
                setPersons(initialPerson)
        })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    if (persons.find((p) => p.name === newName)){// update
      if(window.confirm( `${newName} already exists in the phone book would uou like to update the number ?`)){
        const personToUpDate = {...persons.find((p) => p.name === newName ), number: newNumber}
        
        personsService.update(personToUpDate.id, personToUpDate).then(response => 
          {
            setPersons(persons.map(person => person.id !== personToUpDate.id ? person : response)) 
            setMessageStyle('success')
            setMessage(` '${personToUpDate.name}''s Phone Number was successfully updated`)

            setTimeout(() => {
              setMessage(null)
               }, 5000);
            setNewName('');
            setNewNumber('');

            setNewName("")
            setNewNumber("")
          }
        ).catch(error => {
          setMessageStyle('error')
          setMessage(` '${personToUpDate.name}''s Phone Number has already been removed from the server`)
          setPersons(persons.filter(person => person.id !==  personToUpDate.id))
        })
      } 
    }
    else(
      personsService.create(newPersonObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessageStyle('success')
        setMessage(
          ` '${returnedPerson.name}' was added to phone book`
        )
        setTimeout(() => {
          setMessage(null)
           }, 5000);
        setNewName('');
        setNewNumber('');
        
          }
        )
    )   
  } 

  const handleDelete = (id) => {
    if (window.confirm( `Are you sure you want to delete ?`)){
          const person = persons.find((p) => p.id === id)
          personsService.del(id)
          setPersons(persons.filter(p => p.id !== id));
          setMessageStyle('success')
          setMessage(
            ` '${person.name}' was successfully deleted`
          )
          setTimeout(() => {
            setMessage(null)
             }, 5000);

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
  : persons.filter( person => person.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) )
                          
  return (
  <>  
      <h2>Phone book</h2>

      <Notification message={message}  messageStyle={messageStyle}/>

      <Filter searchTerm={searchTerm} handleChange={(event)=> handleNameFilter(event)}/>
      
      <h3>Add a new</h3>
       
       <Form
           submitPerson={addPerson}
           name={newName}
           number={newNumber}
           nameChangeHandler={handleNameChange}
           numberChangeHandler={handleNumberChange}/>
      <h3>Numbers</h3>
      
      <Persons persons={PersonsToShow} onDelete={handleDelete}/>
      
      </>
  )
}


  export default App
  