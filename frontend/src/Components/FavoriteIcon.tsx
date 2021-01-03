import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteIcon:any = (props: any) => {
    const [clicked, setClicked] = useState(false);   
    
    const createFavoriteUrl = '/api/v1/favorites'

    const createFavorite = async (image: any) => {
      await axios.post(createFavoriteUrl, { favorite: {
        name: image.title,
        giphy_id: image.id,
        url: image.images.preview_gif.url
      }})
    }
    
    const handleClick:any = (event:any, image:any) => {
      event.preventDefault();
      clicked ? setClicked(false) : setClicked(true);
      createFavorite(image)
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