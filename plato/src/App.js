import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import 'bulma/css/bulma.css'

class App extends Component {
  params = {}
  constructor(){
    super();
    this.params = this.getCookies();
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
        <div className="card main-card">
          <div className="card-content">
            <p className="title is-4">Plato - Create Smart Playlists</p>
            <a className="button is-primary" href='http://localhost:8888/login' > Login to Spotify </a> 
          </div>
        </div>
        Access Token: {this.params.access_token}
      </div>
    );
  }
}

export default App;
