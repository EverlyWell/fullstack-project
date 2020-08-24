import React, { useState, useEffect } from 'react';
import { favorite, unFavorite } from '../api';
import Search from './Search';
import Favorites from './Favorites';
import '../App.css';

function App() {
  const [page, setPage] = useState('search');
  const [favorites, setFavorites] = useState([] as any);
  
  useEffect(() => {
    fetch('/api/favorites')
      .then(r => r.json())
      .then(({ favorites: favs }) => {
        setFavorites(favs.map((f: any) => f.giphy_id))
      });
  }, []);
  
  const isGifFav = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    if (isGifFav(id)) {
      unFavorite(id)
      .then(() => setFavorites(favorites.filter((e: string) => e !== id)))
      .catch(e => console.error(e));
    } else {
      favorite(id)
      .then(() => setFavorites([...favorites, id]))
      .catch(e => console.error(e));
    }
  }
  
  const className = (id: string) => page === id ? 'selected' : '';

  return (
    <div className="App">
    <ul id="nav">
      <li className={className('search')}><a href="#search" onClick={() => setPage('search')}>Search</a></li>
      <li className={className('fav')}><a href="#favorites" onClick={() => setPage('fav')}>Favorites</a></li>
    </ul>
    {page === 'search' ?
      <Search isGifFav={isGifFav} toggleFavorite={toggleFavorite} /> :
      <Favorites collection={favorites} isGifFav={isGifFav} toggleFavorite={toggleFavorite} />
    }
    </div>
  )
}

export default App;
