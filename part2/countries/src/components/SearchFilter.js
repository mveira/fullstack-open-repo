const SearchFilter = (props) => {
    return(
    <input 
        value={props.searchTerm}  
        onChange={props.handleChange}/>
    )
}
export default SearchFilter