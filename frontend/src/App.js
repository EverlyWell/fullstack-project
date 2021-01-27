import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

import SearchBar from "./components/SearchBar"
import GifsList from "./components/GifsList"
import Favorites from "./components/Favorites" 

function App() {
  const [gifs, setGifs] = useState([])
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  

  // obtain search results

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:3010/api/gifs/search?search=${search}`)
    .then(res => {
      let gifList = res.data.data.map((gif) => {
        return {
          id: gif.id,
          title: gif.title,
          url: gif.images.original.url
        }
      })
      // console.log(res)
      setGifs(gifList)
    })
    .catch(error => {
      console.log(error)
    })
  }

  //obtain search term from user input

  const handleInput = (e) => {
    const newSearchTerm = e.target.value
    setSearch(newSearchTerm)
  }

  // add gifs to favorites state

  const addGif = (newGif) => {
    setFavorites([...favorites, newGif])
  }

  //post gifs that are favorited to backend

  const handleFavorited = (gif) => {
    axios.post('http://localhost:3010/api/favorites',{
      favorite: {
        title: gif.title,
        url: gif.url,
        giphy_id: gif.id
      }}
    )
    .then(res => {
      addGif(gif)
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })

  }

  return (
    <div className="App">
      <SearchBar handleSubmit={handleSubmit} handleInput={handleInput} />
      <GifsList gifs={gifs} handleFavorited={handleFavorited} />
      <Favorites />
    </div>
  );
}

export default App;
