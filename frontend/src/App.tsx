import React, { useState, useEffect } from 'react';
import { favorite, unFavorite } from './api';
import Search from './Search';
import './App.css';

function App() {
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

  return (
    <div className="App">
      <Search isGifFav={isGifFav} toggleFavorite={toggleFavorite} />
    </div>
  )
}

export default App;
