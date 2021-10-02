/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import StyledComponents from './CatCardStyled';
import { faveImage } from '../../api/api';

const {
    Container,
    Image,
    ImageContainer,
    FavoriteButton,
    FavoriteButtonContainer,
    FavoriteText,
    CardFooter,
    Heart,
} = StyledComponents;

interface Props {
    url: string,
    id: string,
    sub_id: string,
}


const CatCard = (props : Props) => {
    const { url, id, sub_id } = props;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleTogglingFavorite = async () => {
        setIsFavorite(!isFavorite);
        const results = await faveImage({ image_id: id, sub_id });
    };

    return (
        <Container>
            <ImageContainer>
                <Image src={url}/>
                {isFavorite ? <Heart>❤️</Heart> : null}
            </ImageContainer>
            <CardFooter>
                <FavoriteButtonContainer onClick={handleTogglingFavorite}>
                    <FavoriteButton> 
                       {isFavorite ? "😿" : "😻"}  
                    </FavoriteButton> 
                </FavoriteButtonContainer>
                <FavoriteText>
                    {isFavorite ? 'Unfavorite this guy' : 'Favorite this fur ball'}
                </FavoriteText>
            </CardFooter>
        </Container>
    );
};

export default CatCard;
