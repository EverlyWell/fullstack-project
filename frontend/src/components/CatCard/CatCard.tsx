/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import StyledComponents from './CatCardStyled';

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
}


const CatCard = (props : Props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleTogglingFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Container>
            <ImageContainer>
                <Image src={props.url}/>
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
