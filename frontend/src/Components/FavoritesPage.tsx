import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FavoriteContainer from './FavoriteContainer';

const FavoritesPage: any = (props: {images: any}) => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const favoritesUrl = '/api/v1/favorites'
    
    async function getFavorites() {
      setLoading(true);
      const result:any = await axios.get(favoritesUrl);
      setFavorites(result.data);
      setLoading(false);
    }
    
    useEffect(() => {
      console.log('hey');
      getFavorites();
    }, []);

    return (
        <div>
          {loading ? <span>Loading</span> : ''} 
          <div>
            <p>Favorites:</p>
            <div>
              <FavoriteContainer favorites={favorites} />
            </div>
          </div>
        </div> 
    );
}

export default FavoritesPage;
