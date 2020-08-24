import React from 'react';
import { GifOverlayProps } from '@giphy/react-components';
import { HeartIcon, HeartFillIcon } from '@primer/octicons-react';

const Heart = ({ isFav }: any) => (isFav ? <HeartFillIcon size={24} /> : <HeartIcon size={24} />);

const Overlay = ({ isGifFav, toggleFavorite }: any) => ({ gif, isHovered }: GifOverlayProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    toggleFavorite(gif.id);
  }
    return (
      <div className="overlay" onClick={handleClick}>
      {isHovered ? <Heart isFav={isGifFav(gif.id)} /> : ''}
      </div>
    )
}

export default Overlay;