const Country = (props) => {

    const CountryFlagStyle = {
        maxWidth: 200,
        minHeight: 400,
        border: '1px solid rgba(0, 0, 0, 0.05)', 
      }
    
      const CountryNameStyle = {
        color: 'black',
        fontSize: 24,
      }
    
    

    return(
        <>
        <h2 style={CountryNameStyle}>Country: {props.country.name.common}</h2>
        <p>Capital: {props.country.capital}</p>
        <p>Area: {props.country.area}</p>
        <h2>languages:</h2>
        <ul>
            {props.country.languages? 
            Object.values(props.country.languages).map((i, index) => <li key={index}>{i}</li>)
            : null}
        </ul> 
        <div style={CountryFlagStyle}>{props.country.flag}</div>
        </>
    )
}
export default Country