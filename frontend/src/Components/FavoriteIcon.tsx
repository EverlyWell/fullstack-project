import React from 'react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createFavorite, removeFavorite } from '../Services/FavoritesService'

const FavoriteIcon:any = (props: any) => {
    const [clicked, setClicked] = useState(false);   
    
    const handleClick:any = (event:any, image:any) => {
      event.preventDefault();
      if (clicked) {
        setClicked(false);
        removeFavorite(image);
      } else {
        setClicked(true);
        createFavorite(image);
      } 
    };
    
    return (
        <div>
          <div onClick={(e) => handleClick(e, props.image)}>
            {clicked ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
    )
}

export default FavoriteIcon;