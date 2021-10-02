import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 1px 2px #888888;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    max-width: 250px;
`;

const Image = styled.img`
    width: 250px;
    height: 250px;
    object-fit: fill;
`;

const ImageContainer = styled.div`
    width: 250px;
    height: 250px;
    position: relative;
    overflow: hidden;
`;

const FavoriteButton = styled.div`
    display: flex;
    font-size: 24px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const FavoriteButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 10px;
    margin-left: 20px;
    background-color: pink;
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
    width: 100%;
    background-color: white;
`;

const FavoriteText = styled.div`
    margin-left: 8px;
    font-size: 16px;
    color: black;
`;

const Heart = styled.div`
    position: absolute;
    font-size: 22px;
    left: 230px;
    top: 230px;
`;

const StyledComponents = {
    Container,
    Image,
    Heart,
    ImageContainer,
    FavoriteButton,
    FavoriteButtonContainer,
    FavoriteText,
    CardFooter,
};

export default StyledComponents;
