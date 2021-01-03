import React from 'react'
import Favorite from './Favorite'

const FavoriteContainer: any = (props: {favorites: any}) => {

  if (props.favorites.length > 0) {
    return (
      <div>
        {props.favorites.map((favorite:any) => (
          <Favorite key={favorite.id} favorite={favorite} />
        ))}
      </div> 
    )
  } else {
    return (<div>No Favorites</div>)
  }
}

export default FavoriteContainer;
