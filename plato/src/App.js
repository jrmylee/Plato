import React, { Component } from 'react';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(){
    super();
    const params = this.getCookies();
    console.log(params);
  }
  getCookies(){
    var obj = {
      access_token: Cookies.get('access_token'),
      refresh_token: Cookies.get('refresh_token')
    }
    return obj;
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888/login' > Login to Spotify </a>
      </div>
    );
  }
}

export default App;
