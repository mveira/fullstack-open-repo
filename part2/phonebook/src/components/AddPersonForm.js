
function Form(props) {

  return (
    <>
    <form onSubmit={props.submitPerson}>
      <label>
      Name:
      <input
        type="text"
        value={props.name}
        name="name"
        onChange={props.nameChangeHandler}
      />
    </label>
    

      <label>
      Number:
      <input
        type="text"
        value={props.number}
        name="number"
        onChange={props.numberChangeHandler}
      />
    </label>
    <button type="submit">save</button>
  </form>
  </>
  );
  }

export default Form
  
