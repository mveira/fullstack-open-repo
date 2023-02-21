const  NameInput = (props) => {

    return(
    <>
    <label>
        Name:
        <input
          type="text"
          name="name"
          value={props.name}
          onChange={props.nameInput}
        />
        {console.log(props.value)}
      </label>
    </>
    )
}

export default NameInput
