import React from 'react';
import {ImageProps} from '../types'

const ImageContainer: React.FunctionComponent<ImageProps> = ({url, id}) => {
    return(
        <li>
            <img src={url} alt={id} key={id}/>
        </li>
    )
}
export  default ImageContainer