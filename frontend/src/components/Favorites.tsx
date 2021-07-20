import React, { useEffect, useState } from "react";
import axios from 'axios';

function Favorites() {
    const [pics, setPics] = useState([]);
    const token = sessionStorage.getItem('token');
    
    const favoritePics = async (e:any) => {
        axios.get("http://localhost:3010/api/favorites",  { headers: {
            'Authorization': `Bearer ${token}`
        }})
          .then(res => setPics(res.data))
          .catch(error => console.log(error))
    }

    useEffect(() => {
        favoritePics(token)
    }, [token])
    
    console.log(pics)

    if(token) {
        return (
           <div className="container">
            <h1 className="title">Favorites</h1>
            <div className="card-list">
                {pics.map((pic) => 
                <div className="card" key={pic["dog_id"]}>
                    <img
                    className="card--image"
                    src={pic["url"]}
                    width="100%"
                    height="100%"
                    ></img>
                </div>)};
            </div>
        </div>
    );
  }
return <div>Cant load favorites.</div>;
}

export default Favorites;