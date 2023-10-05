
const Persons = (props) => {
    const liStyle = {
        color: 'grey',
        listStyleType: ""
      }
    const ulStyle = {
        textDecoration: ""
    }

    const personContainer = {
       backGroundColor: 'grey',
       display: 'flex',
       flexDirection: 'row'
    }
    

    return(

    <ul style={ulStyle}>
    {props.persons.map((person) => 
        <li style={liStyle} key={person.id}>
            <div style={personContainer}>   
                <div>{person.name}</div>
                <div>{person.number}</div>
                <button onClick={() => props.onDelete(person.id)} >Delete</button>
            </div>      
        </li>)}
    </ul>
    )}

export default Persons

