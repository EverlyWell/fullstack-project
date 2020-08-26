import React, {Component} from 'react';
import ImageSearch from './components/ImageSearch'
import Favorites from './components/Favorites'
import Authenticate from './components/Authenticate'

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      isAuthenticated: false
    }
  }

  setToken = (token: any) => {
    let sevenDays = 3600 * 24 * 7;
    document.cookie = `token=${token}; max-age=${sevenDays};`;

    this.setState({ isAuthenticated: true });
  }

  isAuthenticated() {
    const token = document.cookie.split(`token=`);
    return token.length === 2 && token[1].length !== 0;
  }

  render() {
    return (
      <div className="App">
        {this.isAuthenticated() ? (
          <>
          <Favorites />
          <ImageSearch />
          </>
        ) : (
          <Authenticate setToken={this.setToken} />
        )}
      </div>
    );
  }
}
