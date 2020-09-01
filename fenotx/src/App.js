import React, { Component } from 'react';
import Main from './views/cats/main';

class App extends Component {
  render(){
    return(
      <div>
        <h2>Des Animaux</h2>
        <small>Favorite your favorites</small>
        <Main />
      </div>
    )
  }

}

export default App;
