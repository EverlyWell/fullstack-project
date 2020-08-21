import React, {useState, useContext} from 'react';
import {AppContext} from '../App';

const SearchForm = () => {
  const { images } = useContext(AppContext);
  const [submitButtonText, setSubmitButtonText] = useState('Search');

  async function fetchGiphyData(q: string) {
    const data = await fetch(`http://localhost:3010/api/search?q=${q}`);
    return data.json();
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitButtonText('Searching...');
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    const q = formData.get('q') as string;
    const { data } = await fetchGiphyData(q);
    images.set(data);
    setSubmitButtonText('Search');
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" name="q" placeholder="search" />
      <input type="submit" value={submitButtonText} />
    </form>
  );
};

export default SearchForm;
