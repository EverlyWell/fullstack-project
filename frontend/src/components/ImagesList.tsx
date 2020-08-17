import React from 'react';
import {ImageListProps} from "../types";
import ImageCard from "./ImageCard";

const ImagesList: React.FunctionComponent<ImageListProps> = ({images}) => {
    const listItems = images.map((image) => <ImageCard key={image.id} image={image}/>);

    return(
        <div className={'ImageList'}>
            {listItems}
        </div>
    )
}
export default ImagesList