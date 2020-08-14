import React, {useState} from 'react';
import './App.css';
import ImagesList from './components/ImagesList';
import axios from "axios";

function App() {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');

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
            <form onSubmit={handleSubmit}>
                <textarea value={query} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
            <ImagesList images={images}/>
        </div>
  );
}

export default App;
