import React from 'react';

function SearchForm() {
  return (
    <form>
      <input type="text" name="q" placeholder="search" />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchForm;
