import React, { useState, useEffect } from 'react';
import CatCard from '../CatCard/CatCard';
import StyledComponents from './CatBoardStyled';
import Spinner from 'react-spinners/ClipLoader';

const {
    Container,
    SearchInputContainer,
    CatCardContainer,
    SearchInput,
    SearchText,
    ButtonText,
    ShowMyFavoritesButtonContainer,
    Button,
    SearchResultsContainer,
    FavoritesResultsContainer,
    ShowFavoritesContainer,
} = StyledComponents;


interface CatCardProps {
    url: string,
    id: string,
}

const CatBoard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [favoritesResults, setFavorites] = useState([]);
    const [isLoadingFaves, setIsLoadingFaves] = useState(false);

    const handleSearch = () => {
        setIsLoadingSearch(true);
    }

    const handleShowFavorites = () => {
        setIsLoadingFaves(true);
    }

    const catCards = searchResults.map((catInfo : CatCardProps) => {
        return (
            <CatCardContainer>
                <CatCard key={catInfo.id} {...catInfo} />
            </CatCardContainer>
        );
    });

    const favoriteCatCards = favoritesResults.map((catInfo : CatCardProps) => {
        return (
            <CatCardContainer>
                <CatCard key={catInfo.id} {...catInfo} />
            </CatCardContainer>
        );  
    });

    return (
        <Container>
            <SearchInputContainer>
                <SearchText>Search for CAT BREEDS!</SearchText>
                <SearchInput 
                    value={searchInput} 
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='bengal'
                />
                <Button onClick={handleSearch}>
                    <ButtonText>SEARCH</ButtonText>
                </Button>
            </SearchInputContainer>
            <SearchResultsContainer>
                {isLoadingSearch ? (<Spinner loading={isLoadingSearch} color='#FFFFFF' />) : catCards}
            </SearchResultsContainer>
            <ShowFavoritesContainer>
                <ShowMyFavoritesButtonContainer>
                    <Button onClick={handleShowFavorites}>
                        <ButtonText>Show my Favorites!</ButtonText>
                    </Button>
                </ShowMyFavoritesButtonContainer>
            </ShowFavoritesContainer>
            <FavoritesResultsContainer>
                {isLoadingFaves ? (<Spinner loading={isLoadingFaves} color='#FFFFFF' />) : favoriteCatCards}
            </FavoritesResultsContainer>
        </Container>
    );
};

export default CatBoard;
