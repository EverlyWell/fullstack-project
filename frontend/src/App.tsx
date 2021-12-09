import React from 'react';
import './App.css';

import { Route, Link } from "wouter";

import Images from './pages/Images'
import Favs from './pages/Favs'

import Search from './components/Search'

const ImagesRoute = () => (
    // wouter types are not playing nice with our props
    // @ts-ignore
    <Route path="/images/:query" component={Images} />
)

const FavedImagesRoute = () => (
    // wouter types are not playing nice with our props
    // @ts-ignore
    <Route path="/favs" component={Favs} />
)

function App() {

    return (
        <div className="App">
            <menu>
                <Link href='/favs'>
                    <a href='/favs'> Saved cuteness </a>
                </Link>
            </menu>

            <header className="App-header">
                <h1>
                    Cute collector
                </h1>
            </header>

            <Search />
            

            <FavedImagesRoute/>
            <ImagesRoute/> 
        </div>
    );
}

export default App;
