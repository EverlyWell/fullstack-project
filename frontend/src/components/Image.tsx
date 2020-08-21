import React, {useContext} from 'react';
import {AppContext} from '../App';

interface ImageInterface {
  id: string;
  url: string;
  title: string;
}

const Image = ({
  image,
  favorite,
}: {
  image: ImageInterface;
  favorite: boolean;
}) => {
  const {favorites} = useContext(AppContext);
  function handleClick(id: string) {
    let oldFavorites = favorites.get();
    let newFavorites = [...oldFavorites, id];
    favorites.set(newFavorites);
  }

  return (
    <div className="image">
      <img src={image.url} alt={image.title} style={{width: '100%'}} />
      <button
        onClick={() => {
          handleClick(image.id);
        }}>
        {favorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default Image;
