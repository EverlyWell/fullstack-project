import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: #282c34;
    min-width: 100vw;
    min-height: 100vh;
`;

const CatCardContainer = styled.div`
    margin: 40px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    flex-direction: row; 
    margin-bottom: 20px;    
`;

const SearchText = styled.div`
    font-size: 24px;
    color: white;
`;

const SearchInput = styled.input`
    height: 30px;
    width: 180px;
    margin-left: 10px;
    margin-right: 10px;
`;


const ShowMyFavoritesButtonContainer = styled.div`
    cursor: pointer;
`;

const Button = styled.div`
    display: flex;
    background-color: gray;
    border-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    border-width: 2px;
    border-style: solid;
    height: 40px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ButtonText = styled.div`
    align-text: center;
    font-size: 18px;
    color: white;
`;

const ShowFavoritesContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const FavoritesResultsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
`;

const SearchResultsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
`;

const StyledComponents = {
    Container,
    CatCardContainer,
    SearchInputContainer,
    SearchInput,
    SearchText,
    ShowMyFavoritesButtonContainer,
    Button,
    ButtonText,
    FavoritesResultsContainer,
    SearchResultsContainer,
    ShowFavoritesContainer,
};

export default StyledComponents;

