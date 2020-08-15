import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ImagesList from './components/ImagesList';
import axios from "axios";
import {Breeds, Categories, Types} from './constants/CatFilters';
import Cookies from 'js-cookie';
import Login from "./components/LogIn";

function App() {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const breedSelect = useRef(null);
    const categorySelect = useRef(null);
    const typeSelect = useRef(null);
    const [loggedIn, setLoggedIn] = useState(Cookies.get('jwt')!=='' && Cookies.get('jwt')!== undefined);

    useEffect(()=>{
        const jwt = Cookies.get('jwt');
        console.log(jwt);
        if(jwt!==undefined){
            console.log('status: logged in');
            setLoggedIn(true);
            loadImages();
        }else{
            console.log('not logged in');
        }
    }, [loggedIn])

    const loadImages = async () => {
       const res = await axios.get('/api/images',
           {params: {sSearch: query}, headers: {'Authorization': `Bearer ${Cookies.get('jwt')}`}

       });
       setImages(res.data);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        debugger;
        // const breed = breedSelect.current.value;
        // const type = breedSelect.current.value;
        loadImages();
    }

    return (
        <div className="App">
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div>
                <form className="SearchBar" onSubmit={handleSubmit}>
                    <select name="category" id="category" ref={categorySelect}>
                        <option value={''}/>
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
                <hr/>
                <ImagesList images={images}/>
            </div>
        </div>
  );
}

export default App;