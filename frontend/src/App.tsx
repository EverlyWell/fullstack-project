import React, {useState, useEffect} from 'react';
import './App.css';
import ImagesList from './components/ImagesList';
import axios from "axios";

function App() {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(()=>{
        loadImages();
    }, [])

    const loadImages = () => {
        axios.get('/api/images', {params: {sSearch: query}})
            .then(res=>setImages(res.data));
    }

    const handleChange = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setQuery(e.currentTarget.value);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        loadImages();
    }

    return (
        <div className="App">
            <form className="SearchBar" onSubmit={handleSubmit}>
                <input value={query} onChange={handleChange} />
                <input type="submit" value="Search" />
            </form>
            <hr/>
            <ImagesList images={images}/>
        </div>
  );
}

export default App;
