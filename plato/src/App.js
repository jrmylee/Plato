import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import 'bulma/css/bulma.css'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {  
  constructor(){
    super();
    let token = Cookies.get('access_token');
    this.state = {
      access_token: token,
      refresh_token: Cookies.get('refresh_token'),
      isLoggedIn: !!token
    }
    if(token) spotifyApi.setAccessToken(token);
  }
  
  copyToken(){
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', this.state.access_token);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
  
  downloadJson(tracks){
    let url = window.URL.createObjectURL(new Blob([JSON.stringify(tracks)]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tracks.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  parseTracks(){
    if(this.state.isLoggedIn){
      spotifyApi.getMySavedTracks({limit: 50})
        .then(tracks => tracks.items)
        .then(async tracks =>{
          var ids = tracks.map(t => t.track.id);
          let response = await spotifyApi.getAudioFeaturesForTracks(ids);
          let features = response.audio_features;
          features = features.map(feature => {
            var track = tracks.find(t => t.track.id === feature.id);
            return {
              ...feature,
              artist: track.track.artists[0].name,
              name: track.track.name
            }
          })
          this.downloadJson(features);
        })
    }
  }

  logout(){
    this.setState({isLoggedIn: false, access_token: null, refresh_token: null})
  }

  componentDidMount(){
    
  }

  render() {
    let button;
    if(this.state.isLoggedIn){
      button = (
        <React.Fragment>
          <div className="buttons">
            <button className="full-width button is-info" onClick={() => this.copyToken()}> Copy Token </button>
            <button className="full-width button is-primary" onClick={() => this.parseTracks()}> Download Library </button>
            <button className="full-width button is-danger" onClick={() => this.logout()}> Logout </button>
          </div>
        </React.Fragment>
      );
    }else{
      button = <a className="button is-primary" href='http://localhost:8888/login' > Login to Spotify </a>
    }
    return (
      <div className="App">
        <div>
          <p className="title is-4">Plato - Create Smart Playlists</p>
          {button}
        </div>
      </div>
    );
  }
}

export default App;
