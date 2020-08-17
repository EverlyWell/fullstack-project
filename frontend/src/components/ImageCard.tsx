import React, {useState} from 'react';
import {ImageCardProps} from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';

const ImageCard:React.FunctionComponent<ImageCardProps> = (props) => {
    const [image, setImage]  = useState(props.image);

    const handleClick = async (e:any) => {
        const liked = e.target.classList.contains('Liked');
        if(!liked){
            axios.post('api/favorite', {identifier: image.id, url: image.url},
            {headers: {'Authorization': `Bearer ${Cookies.get('jwt')}`}})
                .then(res=>setImage({...image, fav_id: res.data.id}))
        }else{
           axios.delete(`api/favorite/${image.fav_id}`,
                {headers: {'Authorization': `Bearer ${Cookies.get('jwt')}`}})
               .then(res=> setImage({...image, fav_id: ''}));
        };
    }

    return(
        <div className={"ImageDiv"}>
            <span id={image.id} onClick={handleClick}>
                <i className={`material-icons ${image.fav_id ? 'Liked' : ''}`}>
                    favorite
                </i></span>
            <img className={'CatImg'} src={image.url} alt={image.id}/>
        </div>
    );
}
export  default ImageCard;