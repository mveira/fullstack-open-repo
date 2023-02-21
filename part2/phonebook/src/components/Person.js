const Person = (person, props) => {
    console.log('person component',props)
    return(
        <>
        
            <li>{person.name} : {person.number} 
                <button onClick={() => props.onDelete(person.id)} >Delete</button>
            </li>
       
        </>

    )
        }
export default Person