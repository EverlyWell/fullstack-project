import React, {useState, useReducer} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Input} from 'semantic-ui-react';

import ImageCard from './ImageCard'

function Search() {
  const history = useHistory()
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const [searchValue, setSearchValue] = useState()
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const onChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(ev.target.value)
    fetchAPI()
  }

  const fetchAPI = async () => {
    setError('')
    const response = await fetch(`/api/images/search?query=${decodeURIComponent(searchValue)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    const images = await response.json()
    if(images.error === true) {
      setError(images.data)
    } else {
      setImages(images.data)
    }
  }

  const rerenderParentCallback = () => {
    fetchAPI();
  }

  return (
    <div className="search">
      {error &&
        <span className="error">We Encountered an error {error}</span>
      }
        <div className="fields">
          <h1>Search Giphy</h1>
          <Input placeholder="Search Gihpy" type="text" onChange={(ev: React.ChangeEvent<HTMLInputElement>)=> onChange(ev)} />
        </div>

        <div className="image-container">
          {images && images.map((e: any, idx: number) => {
            return <ImageCard  key={idx} img={e} rerender={rerenderParentCallback} />
          })
          }
        </div>

        <Button style={{display: 'block', margin: '20px auto'}} onClick={() => history.push('/favorites')}>See Favorites</Button>
    </div>
  );
}

export default Search;