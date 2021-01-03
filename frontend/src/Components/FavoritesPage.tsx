import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken, loggedIn } from '../Services/AuthenticationService';
import FavoriteContainer from './FavoriteContainer';

const FavoritesPage: any = (props: {images: any}) => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredFavorites, setFilteredFavorites] = useState([]);

    const favoritesUrl = '/api/v1/favorites';
    
    async function getFavorites() {
      setLoading(true);
      const result:any = await axios.get(favoritesUrl, { headers: {
        'Authorization': `Bearer ${getToken()}`
      }});
      setFavorites(result.data);
      setFilteredFavorites(result.data);
      setLoading(false);
    }
    
    useEffect(() => {
      if (loggedIn() === true) {
        getFavorites();
      }
    }, []);

    return (
        <div>
          {loggedIn() !== true ? <p>Log in to see your favorites</p> : ""} 
          {loading ? <span>Loading</span> : ''} 
          {loggedIn() === true ? 
          <div>
            <form onSubmit = {(e) => e.preventDefault()}>
              <input type = "search" 
                     onChange = {(e) => {
                
                const filter = favorites.filter((favorite:any) => {
                  return (
                    favorite.name.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                })
                setFilteredFavorites(filter)
                if(e.target.value === '') {
                  setFilteredFavorites(favorites);
              }}} />
              </form>
            <p>Favorites:</p>
            <div>
              <FavoriteContainer favorites={filteredFavorites} />
            </div>
          </div> : ""}
        </div> 
    );
}

export default FavoritesPage;
