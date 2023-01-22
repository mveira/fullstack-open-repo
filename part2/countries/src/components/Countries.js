import Country from './Country'
const Countries = (props) => {
    // const filteredCountries = !props.searchTerm
    //     ? props.countries
    //     : props.countries.filter(country => country.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
        return(
        <div>  
            <h2>Numbers</h2>
            {props.countries.map(country => <Country name={country.name}/>)}
        </div>
    )
}
export default Countries