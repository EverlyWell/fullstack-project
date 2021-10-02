import React, { useState } from 'react';
import CatCard from '../CatCard/CatCard';
import StyledComponents from './CatBoardStyled';
import Spinner from 'react-spinners/ClipLoader';
import { myFavorites, searchCats } from '../../api/api';

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

interface Props {
    sub_id: string,
}

const CatBoard = ({ sub_id } : Props) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [favoritesResults, setFavorites] = useState([]);
    const [isLoadingFaves, setIsLoadingFaves] = useState(false);

    const handleSearch = async () => {
        setIsLoadingSearch(true);
        const results = await searchCats({ query: searchInput });
        setSearchResults(results);
        setIsLoadingSearch(false);
    }

    const handleShowFavorites = async () => {
        setIsLoadingFaves(true);
        const results = await myFavorites({ sub_id });
        setFavorites(results);
        setIsLoadingFaves(false);
    }

    const catCards = searchResults.map((catInfo : CatCardProps) => {
        return (
            <CatCardContainer>
                <CatCard key={catInfo.id} {...catInfo} sub_id={sub_id} />
            </CatCardContainer>
        );
    });

    const favoriteCatCards = favoritesResults.map((catInfo : CatCardProps) => {
        return (
            <CatCardContainer>
                <CatCard key={catInfo.id} {...catInfo} sub_id={sub_id} />
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
