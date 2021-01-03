import React from 'react'
import FavoriteIcon from './FavoriteIcon';
import '../Styles/image.css';
import { loggedIn } from '../Services/AuthenticationService'
 
const Image = (props: { image: any }) => {

  return (
    <div className="imageContainer">
      <img className="image" src={props.image.images.preview_gif.url} alt='failed' />
      <div>{props.image.title}</div>
      {loggedIn() === true ? <FavoriteIcon image={props.image} /> : 
                              <div>Log in to add to favorites</div>}
    </div>
  )
}

export default Image
