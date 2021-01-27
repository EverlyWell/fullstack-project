import React from 'react';
import {Input} from 'semantic-ui-react'


const SearchBar = (props) => {
    
    return(
        <div className="searchbar">
            <h1>Search</h1>
            <form onSubmit={props.handleSubmit}>
                <Input action='Search' name="search" value={props.search} placeholder="Search Gifs" onChange={props.handleInput} />
            </form>
        </div>
    )
}

export default SearchBar