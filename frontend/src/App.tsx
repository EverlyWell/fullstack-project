import React from 'react';
import './App.css';

import { Link, Route } from "wouter";

import Images from './pages/Images'

const ImagesRoute = () => (
    // wouter types are not playing nice with our props
    // @ts-ignore
    <Route path="/images/:query" component={Images} />
)

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Cute collector
                </h1>
            </header>
            
            <ImagesRoute/> 
        </div>
    );
}

export default App;
