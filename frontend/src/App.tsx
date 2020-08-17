import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ImagesList from './components/ImagesList';
import axios from "axios";
import Cookies from 'js-cookie';
import Login from "./components/LogIn";
import ImageFilters from "./components/ImageFilters";
import {Filters} from './types'

function App() {
    const [images, setImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        const jwt = Cookies.get('jwt');
        if(jwt!==undefined){
            setLoggedIn(true);
            loadImages();
        } else {
            console.log('not logged in');
        }
    }, [])

    const loadImages = async (url: string = 'api/images', filters: Filters = {}) => {
       const res = await axios.get(url,
           {params: filters, headers: {'Authorization': `Bearer ${Cookies.get('jwt')}`}
       });
       setImages(res.data);
    }

    return (
        <div className="App">
            <div className="LoginContainer">
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
             </div>
            { loggedIn &&
                <div>
                    <ImageFilters loadImages={loadImages}/>
                    <hr/>
                    <ImagesList images={images}/>
                </div>
            }
        </div>
    );
}

export default App;