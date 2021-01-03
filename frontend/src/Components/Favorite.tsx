import React from 'react';
import '../Styles/image.css'

  const Favorite = (props: { favorite: any }) => {

    return (
      <div className="imageContainer">
        <img className="image" src={props.favorite.url} alt='failed' />
      </div>
    )
  }
  
  export default Favorite;
  