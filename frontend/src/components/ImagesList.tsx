import React from 'react';
import {ImageListProps} from "../types";

const ImagesList: React.FunctionComponent<ImageListProps> = ({images}) => {
    const listItems = images.map(({url, id}) => <div key={id}><img src={url} alt={id}/></div>);
    return(
        <div>
            {listItems}
        </div>
    )
}
export default ImagesList