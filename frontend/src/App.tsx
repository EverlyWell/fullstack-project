import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ImagesList from './components/ImagesList';
import axios from "axios";
import {Breeds, Categories, Types} from './constants/CatFilters';
import Cookies from 'js-cookie';
import Login from "./components/LogIn";
import ImageFilters from "./components/ImageFilters";
import {Filters} from './types'

function App() {
    const [images, setImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(Cookies.get('jwt')!=='' && Cookies.get('jwt')!== undefined);

    useEffect(()=>{
        const jwt = Cookies.get('jwt');
        console.log(jwt);
        if(jwt!==undefined){
            console.log('status: logged in');
            setLoggedIn(true);
        }else{
            console.log('not logged in');
        }
    }, [images, loggedIn])

    const loadImages = async (filters: Filters) => {
       const res = await axios.get('/api/images',
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