import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

import SearchBar from "./components/SearchBar"
import GifsList from "./components/GifsList"
import Favorites from "./components/Favorites" 

function App() {
  const [gifs, setGifs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="App">
      <SearchBar />
      <GifsList />
      <Favorites />
    </div>
  );
}

export default App;
