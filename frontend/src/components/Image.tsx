import React, {useContext} from 'react';
import {AppContext} from '../App';

interface ImageInterface {
  id: string;
  url: string;
  title: string;
}

const Image = ({image, favorite}: {image: ImageInterface, favorite: boolean}) => {
  function handleClick(id: string) {
    // TODO
    
  }

  return (
    <div>
      <img src={image.url} alt={image.title} style={{width: '100%'}} />
      <button
        onClick={() => {
          handleClick(image.id);
        }}>
        Favorite
      </button>
    </div>
  );
};

export default Image;
