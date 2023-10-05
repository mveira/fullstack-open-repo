const Person = ({person, props}) => {
   
    return(        
        <li>{person.name}  {person.number} 
            <button onClick={props.onDelete(person.id)} >Delete</button>
        </li>
    )
        }
export default Person