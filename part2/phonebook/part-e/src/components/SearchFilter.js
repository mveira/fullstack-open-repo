const SearchFilter = (props) => {
    return (
        <div>
            Filter name with:
        <input
        value={props.searchTerm}
        onChange={props.handleChange}/>
        </div>
)}
export default SearchFilter

