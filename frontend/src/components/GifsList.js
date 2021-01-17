import React from 'react';
import Gif from "./Gif"

const GifsList = (props) => {
    
    return(
        <div>
            {props.gifs.map(gif => 
                <Gif key={gif.id} gif={gif} handleFavorited={props.handleFavorited} addGif={props.addGif} />
            )}
        </div>
    )
}

export default GifsList