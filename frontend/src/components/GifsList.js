import React from 'react';
import Gif from "./Gif"
import {Grid} from 'semantic-ui-react'

const GifsList = (props) => {
    
    return(
        <div className="gifs-list">
            <Grid>
                    {props.gifs.map(gif => 
                        <Gif key={gif.id} gif={gif} handleFavorited={props.handleFavorited} />
                    )}
            </Grid>
        </div>
    )
}

export default GifsList