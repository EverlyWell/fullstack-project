import React, { useState } from 'react';
import axios from 'axios';
import ImageContainer from './ImageContainer';

const SearchPage: any = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const searchUrl = `api/v1/images/search`;
  
  const handleChange = (event: any) => {
    const newSearch = event.target.value;
    setValue(newSearch);
  }
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const result = await axios.get(searchUrl, { params: {
      search: value 
    }});
    setImages(result.data.data);
    setLoading(false);
  }


  return (
    <div>
      <p>Gif Image Search App</p>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {loading ? <span>Loading</span> : <ImageContainer images={images} />}
    </div>
    );
}
export default SearchPage;
