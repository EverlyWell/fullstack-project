import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid} from 'semantic-ui-react'
import FavoriteGifs from "./FavoriteGifs"

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    //fetch favorites from backend

    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:3010/api/favorites")
            .then(res => {
                setFavorites(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchData();
        
    }, [])

    return(
        <div>
            <h1>Favorites</h1>
            <br />
            <Grid>
                {favorites.map(favoriteGifs =>  <FavoriteGifs key={favoriteGifs.id} favoriteGifs={favoriteGifs} />)}
            </Grid>
        </div>
    )
}

export default Favorites