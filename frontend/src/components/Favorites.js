import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "GET",
                url: "http://localhost:3010/api/favorites"
            })
            .then(res => {
                console.log(res)
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
            <li>{favorites}</li>
        </div>
    )
}

export default Favorites