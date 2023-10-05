


const Countries = (props) => {
    const show =  ()  => {

    }
        return(
            props.countries.map((country, index) => <form onSubmit={show()}> 
                                                        <div>
                                                            <text key={index}>{country.name.common}</text>
                                                            <button type="submit" >Show</button>   
                                                        </div> 
                                                    </form>)
    )
}
export default Countries