import React from 'react';
import {ImageListProps} from "../types";

const ImagesList: React.FunctionComponent<ImageListProps> = ({images}) => {
    const listItems = images.map(({url, id, liked=true}) =>
        <div key={id} className={"ImageDiv"}>
            <span><i className={`material-icons ${liked ? 'Liked' : ''}`}>favorite</i></span>
            <img className={'CatImg'} src={url} alt={id}/>
        </div>);

    return(
        <div className={'ImageList'}>
            {listItems}
        </div>
    )
}
export default ImagesList