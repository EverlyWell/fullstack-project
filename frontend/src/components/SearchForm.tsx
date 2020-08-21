import React from 'react';

const SearchForm = () => {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    console.log(formData.get('q'));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="q" placeholder="search" />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchForm;
