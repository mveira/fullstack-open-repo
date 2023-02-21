const Persons = (props) => {
    console.log(props)
    return(
<>
<h3>Contacts</h3>
 <ul>
 {props.persons.map(person =>    <li id={person.id}>
                                 {person.name} : {person.number}
                                 <button onClick={() => props.onDelete(person.id)} >Delete</button>      
                                </li>
                    )
}
 </ul>
 </>
    )
}

export default Persons

