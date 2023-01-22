import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import SearchFilter from './components/SearchFilter'

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

  const handleSearchInputFilter = (event) => {
    setSearchTerm(event.target.value)
    }
  
  return (

 <div>
    <div>
      find countries <input 
        value={searchTerm}  
        onChange={handleSearchInputFilter}
      />
    </div>
    <h1>Countries</h1>
   
    
    {   
        countries.filter(country => 
          country.name.official.toLowerCase()
              .includes(searchTerm
              .toLowerCase())
          )
          .slice(0, 10).sort().map(country =>

          <div>
          <section>
            <h2>Country: {country.name.common}</h2>
            
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>languages:</h2>
            <ul>
              {country.languages ? Object.values(country.languages).map(i => <li>{i}</li>)
              : null}
            </ul>
            <div>{country.flag}</div>
        </section>
        </div>  
      )
    }

    </div>
  );
}

export default App;