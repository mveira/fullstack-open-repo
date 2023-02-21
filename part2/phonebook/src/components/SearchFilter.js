const SearchFilter = (props) => {
    return (
        <div>
            filter name with:
        <input
        value={props.searchTerm}
        onChange={props.handleChange}/>
        </div>
)}
export default SearchFilter

