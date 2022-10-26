const Form = (props) => {
  return(
  <form onSubmit={props.submitEntry}>
        <div>
          name: <input 
                 value={props.name.charAt(0).toUpperCase() + props.name.slice(1)} 
                 onChange={ props.handleName}/>
        </div>
        <div>
          number: <input 
                 value={props.number} 
                 onChange={ props.handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
export default Form



