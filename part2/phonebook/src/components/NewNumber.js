const NumberInput = (props) => {

    return(
        <>
        <label>
        Number:
        <input
          type="int"
          name="number"
          value={props.number}
          onChange={props.numberInput}
        />
         {console.log("prop", props.value)}
      </label>
      </>
    )
} 

export default NumberInput