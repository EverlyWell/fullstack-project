import React from 'react';

const SearchBar = (props) => {
    
    return(
        <div>
            <h1>Search</h1>
            <form onSubmit={props.handleSubmit}>
                <input type="search" name="search" value={props.search} placeholder="Search Gifs" onChange={props.handleInput} />
                <button type="submit"> Search </button>
            </form>
        </div>
    )
}

export default SearchBar