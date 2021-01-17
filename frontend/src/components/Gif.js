import React from 'react';


const Gif = (props) => {
    const handleClick = (e) => {
        e = props.gif
        props.addGif(e)
        props.handleFavorited(e)
    }
    return(
        <div>
            <div id={props.gif.id}>
            <img src={props.gif.url} alt="gif" />
            <h4>{props.gif.title}</h4>
            <button onClick={handleClick}>Favorite</button>
            </div>
        </div>
    )
}

export default Gif