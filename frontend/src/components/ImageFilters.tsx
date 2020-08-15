import React, {useRef} from "react";
import {Breeds, Categories, Types} from "../constants/CatFilters";
import {ImageFiltersProps} from "../types";

const ImageFilters:React.FunctionComponent<ImageFiltersProps> = ({loadImages}) => {
    const breedSelect = useRef<HTMLSelectElement>(null);
    const categorySelect = useRef<HTMLSelectElement>(null);
    const typeSelect = useRef<HTMLSelectElement>(null);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let breed = '';
        let type = '';
        let category = '';
        if(breedSelect.current) breed = breedSelect.current.value;
        if(typeSelect.current) type = typeSelect.current.value;
        if(categorySelect.current) category = categorySelect.current.value;
        loadImages({breed, type, category});
    }


    return (
        <form className="SearchBar" onSubmit={handleSubmit}>
            <select name="category" id="category" ref={categorySelect}>
                <option value=''/>
                {Categories.map(c=><option  key={c} value={c}>{c}</option>)}
            </select>
            <select name="type" id="type" ref={typeSelect}>
                <option value={''}/>
                {Types.map(t=><option  key={t} value={t}>{t}</option>)}
            </select>
            <select defaultValue='' name="breed" id="breed" ref={breedSelect} >
                <option value={''}/>
                {Breeds.map(b=><option key={b} value={b}>{b}</option>)}
            </select>
            <input type="submit" value="Search" />
        </form>
    );
}
export default ImageFilters;