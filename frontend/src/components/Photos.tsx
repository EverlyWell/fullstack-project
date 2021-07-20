import React, { useState } from "react";
import axios from 'axios';

function Photos() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const token = sessionStorage.getItem('token')

    const searchPhotos = async (e:any) => {
        e.preventDefault();
        axios.get("http://localhost:3010/api/dogs", {params: {breed_name: query}})
          .then(res => setPics(res.data))
          .catch(error => console.log(error))
    };
  
    const favoritePhoto = async (e:any) => {
      axios.get("http://localhost:3010/api/favorite",{params:{breed_id: e}, headers: {
        'Authorization': 'Bearer ' + token
    }})
        .then(res => console.log(res))
        .catch(error => console.log(error))
  };

  return (
    <div className="container">
    <h1 className="title">Dogs</h1>
    <form className="form" onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
        {" "}
        </label>
        <input
        type="text"
        name="query"
        className="input"
        placeholder={`Try "poodle" or "doberman"`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
        Search
        </button>
  </form>
  <div className="card-list">
        {pics.map((pic) => 
        <div>
          <div className="card" key={pic["dog_id"]}>
            <img
              className="card--image"
              src={pic["url"]}
              width="100%"
              height="100%"
            ></img>
          </div>
          {token &&
            <button onClick={() => favoritePhoto(pic["dog_id"])}>Favorite</button>
          }
          </div>
          )};
      </div>
  </div>
  );
}

export default Photos;