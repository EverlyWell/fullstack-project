import React from 'react';
import { removeFavorite } from '../Services/FavoritesService';
import { FaHeart } from 'react-icons/fa';
import '../Styles/image.css'

  const Favorite = (props: { favorite: any }) => {

    return (
      <div className="imageContainer">
        <img className="image" src={props.favorite.url} alt='failed' />
        <br />
        <div onClick={() => removeFavorite(props.favorite, true)}>
          <FaHeart />
        </div>
      </div>
    )
  }
  
  export default Favorite;
  