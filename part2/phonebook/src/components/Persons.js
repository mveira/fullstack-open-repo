import Person from './Person'
const Persons = (props) => {
    const filteredPersons = !props.searchTerm
        ? props.persons
        : props.persons.filter(person => person.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
        return(
        <div>  
            <h2>Numbers</h2>
            {filteredPersons.map(person => <Person name={person.name} number={person.number}/>)}
        </div>
    )
}
export default Persons

