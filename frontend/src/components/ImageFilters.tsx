import React, {useEffect, useRef, useState} from "react";
import {ImageFiltersProps} from "../types";
import axios from 'axios';

const ImageFilters:React.FunctionComponent<ImageFiltersProps> = ({loadImages}) => {
    const breedSelect = useRef<HTMLSelectElement>(null);
    const categorySelect = useRef<HTMLSelectElement>(null);
    const [breeds, setBreeds] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let breed_id = '';
        let category_ids = '';
        if(breedSelect.current) breed_id = breedSelect.current.value;
        if(categorySelect.current) category_ids = categorySelect.current.value;
        loadImages('api/images',{breed_id, category_ids});
    }

    useEffect(()=>{
        const categoriesReq = 'https://api.thecatapi.com/v1/categories';
        const breedsReq = 'https://api.thecatapi.com/v1/breeds';
        axios.get(breedsReq).then((res) => {setBreeds(res.data);})
        axios.get(categoriesReq).then((res) => {setCategories(res.data);})
    },[])

    const showFav = () =>{
        if(breedSelect.current) breedSelect.current.value = '';
        if(categorySelect.current) categorySelect.current.value = '';
        loadImages('api/favorite', {});
    }

    return (
        <div>
            <button onClick={showFav}>Show My Favorites</button>
            <form className="SearchBar" onSubmit={handleSubmit}>
                <span> Category: </span>
                <select name="category" id="category" ref={categorySelect}>
                    <option value=''>All</option>
                    {categories.map(({id, name})=><option  key={id} value={id}>{name}</option>)}
                </select>
                <span>Breed: </span>
                <select defaultValue='' name="breed" id="breed" ref={breedSelect} >
                    <option value=''>All</option>
                    {breeds.map(({id, name})=><option key={id} value={id}>{name}</option>)}
                </select>
                <input type="submit" value="Apply" />
            </form>
        </div>
    );
}
export default ImageFilters;