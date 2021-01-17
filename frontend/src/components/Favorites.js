import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FavoriteGifs from "./FavoriteGifs"

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    //fetch favorites from backend

    useEffect(() => {
        const fetchData = () => {
            axios({
                method: "GET",
                url: "http://localhost:3010/api/favorites"
            })
            .then(res => {
                console.log(res.data)
                setFavorites(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchData();
        
    }, [])

    console.log(favorites)
    return(
        <div>
            <h1>Favorites</h1>
            {favorites.map(favoriteGifs =>  <FavoriteGifs favoriteGifs={favoriteGifs} />)}
        </div>
    )
}

export default Favorites