import React, {useState} from 'react';

const SearchForm = () => {
  const [submitButtonText, setSubmitButtonText] = useState('Search');

  function fetchGiphyData(q: string) {
    return fetch(`http://localhost:3010/api/search?q=${q}`);
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitButtonText('Searching...');
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const q = formData.get('q') as string;
    fetchGiphyData(q).then(data => {
      console.log(data);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="q" placeholder="search" />
      <input type="submit" value={submitButtonText} />
    </form>
  );
};

export default SearchForm;
