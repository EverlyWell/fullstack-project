import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageContainer from './ImageContainer';
import './image.css'

const SearchForm: any = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const searchUrl = `api/v1/images/search`;
  
  const handleChange = (event: any) => {
    const newSearch = event.target.value;
    setValue(newSearch);
  }
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const result = await axios.get(searchUrl, { params: {
      search: value 
    }});
    setImages(result.data.data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ImageContainer images={images} />
    </div>
    );
  }

export default SearchForm;
