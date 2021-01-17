import React from 'react';


const FavoriteGifs = (props) => {
    console.log(props.favoriteGifs)
    return(
        <div>
            <div>
                <img src={props.favoriteGifs.url} alt="gif" />
                <h4>{props.favoriteGifs.title}</h4>
            </div>
        </div>
    )
}

export default FavoriteGifs