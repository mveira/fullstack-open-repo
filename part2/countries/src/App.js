import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import SearchFilter from './components/SearchFilter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  
  useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const fetch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
    console.log(searchTerm)
    }

  const countriesToDisplay = countries.filter(country => country.name.common.toLowerCase().indexOf(searchTerm) > -1)
    
  return (
    <>
    <form onChange={fetch}>
        find country<input/>
      </form>
    {
      searchTerm? 
        countriesToDisplay.length <= 10 ? 
          countriesToDisplay.length === 1 ? 
             <Country country={countriesToDisplay[0]}></Country>
           : <Countries countries={countriesToDisplay}></Countries>
            // :countriesToDisplay.map((country, index) => <div key={index}>{country.name.common}</div>)  // will display a list of countrys relating to the search term  
        :"Too many matches, specify another filter"
      :""  
    }
    </>
  );
}

export default App;