import React from 'react'
import FavoriteIcon from './FavoriteIcon';
import '../Styles/image.css';

const Image = (props: { image: any }) => {

  return (
    <div className="imageContainer">
      <img className="image" src={props.image.images.preview_gif.url} alt='failed' />
      <br />
      <FavoriteIcon image={props.image} />
    </div>
  )
}

export default Image
