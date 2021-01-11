import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { loginURL } from './spotify';

const spotifyWebApi = new Spotify();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyWebApi.setAccessToken(token);
    }
    
    this.state = {
      loggedIn: params.access_token ? true : false,

      me: {
        userID: '',
        displayName:'',
      },

      otherUser: {
        userID: '',
        displayName:'',
      },
      sameShortTermSongs: [],
      sameMediumTermSongs: [],
      sameLongTermSongs: []
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

 addSongs(){
    var Options1 = {time_range: "short_term",limit: 50}
    spotifyWebApi.getMyTopTracks(Options1)
      .then((response) => {
        for(var i = 0; i < 50; i++){
          fetch(`http://localhost:4000/shortterm/add?user_id=${this.state.me.userID}&title=${response.items[i].name}&artist=${response.items[i].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });
    var Options2 = {time_range: "short_term",limit: 50,offset: 49}
    spotifyWebApi.getMyTopTracks(Options2)
      .then((response) => {
        for(var j = 0; j < 50; j++){
          fetch(`http://localhost:4000/shortterm/add?user_id=${this.state.me.userID}&title=${response.items[j].name}&artist=${response.items[j].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });

    var Options3 = {time_range: "medium_term",limit: 50}
    spotifyWebApi.getMyTopTracks(Options3)
      .then((response) => {
        for(var i = 0; i < 50; i++){
          fetch(`http://localhost:4000/mediumterm/add?user_id=${this.state.me.userID}&title=${response.items[i].name}&artist=${response.items[i].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });
    var Options4 = {time_range: "medium_term",limit: 50,offset: 49}
    spotifyWebApi.getMyTopTracks(Options4)
      .then((response) => {
        for(var j = 0; j < 50; j++){
          fetch(`http://localhost:4000/mediumterm/add?user_id=${this.state.me.userID}&title=${response.items[j].name}&artist=${response.items[j].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });

    var Options5 = {time_range: "long_term",limit: 50}
    spotifyWebApi.getMyTopTracks(Options5)
      .then((response) => {
        for(var i = 0; i < 50; i++){
          fetch(`http://localhost:4000/longterm/add?user_id=${this.state.me.userID}&title=${response.items[i].name}&artist=${response.items[i].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });
    var Options6 = {time_range: "long_term",limit: 50,offset: 49}
    spotifyWebApi.getMyTopTracks(Options6)
      .then((response) => {
        for(var j = 0; j < 50; j++){
          fetch(`http://localhost:4000/longterm/add?user_id=${this.state.me.userID}&title=${response.items[j].name}&artist=${response.items[j].artists[0].name}`)
          .catch(err => console.error(err));
        };
    });

    };

    updateSongs(){
      var Options1 = {time_range: "short_term",limit: 50}
      spotifyWebApi.getMyTopTracks(Options1)
        .then((response) => {
          for(var i = 0; i < 50; i++){
            fetch(`http://localhost:4000/shortterm/update?user_id=${this.state.me.userID}&title=${response.items[i].name}&artist=${response.items[i].artists[0].name}&num=${i+1}`)
            .catch(err => console.error(err));
          };
      });

      var Options2 = {time_range: "medium_term",limit: 50}
      spotifyWebApi.getMyTopTracks(Options2)
        .then((response) => {
          for(var j = 0; j < 50; j++){
            fetch(`http://localhost:4000/mediumterm/update?user_id=${this.state.me.userID}&title=${response.items[j].name}&artist=${response.items[j].artists[0].name}&num=${j+1}`)
            .catch(err => console.error(err));
          };
      });

      var Options3 = {time_range: "long_term",limit: 50}
      spotifyWebApi.getMyTopTracks(Options3)
        .then((response) => {
         for(var k = 0; k < 50; k++){
          fetch(`http://localhost:4000/longterm/update?user_id=${this.state.me.userID}&title=${response.items[k].name}&artist=${response.items[k].artists[0].name}&num=${k+1}`)
          .catch(err => console.error(err));
        };
      });
    };
    
    getMyInfo(){
      spotifyWebApi.getMe()
        .then((response) => {
          this.setState({
            me: {
              userID: response.id,
              displayName: response.display_name
          }
        })
      })
    };

    deleteMySongs(){
      var user_id = this.state.me.userID;
      fetch(`http://localhost:4000/shortterm/delete?user_id=${user_id}`)
      .catch(err => console.error(err));

      fetch(`http://localhost:4000/mediumterm/delete?user_id=${user_id}`)
      .catch(err => console.error(err));
    
      fetch(`http://localhost:4000/longterm/delete?user_id=${user_id}`)
      .catch(err => console.error(err));
    };

    compareSongs(){
      var otherID = document.getElementById('input').value
      fetch(`http://localhost:4000/shortterm/compare?user_id1=${this.state.me.userID}&user_id2=${otherID}`)
      .then(response => response.json())
      .then(response => this.setState({ sameShortTermSongs: response.songs }))
      .catch(err => console.error(err));

      fetch(`http://localhost:4000/mediumterm/compare?user_id1=${this.state.me.userID}&user_id2=${otherID}`)
      .then(response => response.json())
      .then(response => this.setState({ sameMediumTermSongs: response.songs }))
      .catch(err => console.error(err));

      fetch(`http://localhost:4000/longterm/compare?user_id1=${this.state.me.userID}&user_id2=${otherID}`)
      .then(response => response.json())
      .then(response => this.setState({ sameLongTermSongs: response.songs }))
      .catch(err => console.error(err));
    };

  renderSongs = ({ title, artist }) => <div>{title} By: {artist}</div>

  render() {
    this.getMyInfo();
    this.addSongs();
    return (
      <div className="App">
        <a href = {loginURL}  onClick = {this.updateSongs()}>
          <button>Login With Spotify</button>
        </a>

         <div>
          <button onClick = {() => this.compareSongs()}>
            Compare Songs
          </button>
        </div>

       <div>
        <label id = "usernameLabel" name = "usernameLabel">Enter Spotify Username</label>
       </div>

       <div>
          <input type="text" id="input" name ="input"></input>
       </div>

        <div>
          Short Term Songs: {this.state.sameShortTermSongs.map(this.renderSongs)}
        </div>
        
        <div>
          Medium Term Songs: {this.state.sameMediumTermSongs.map(this.renderSongs)}
        </div>

        <div>
          Long Term Songs: {this.state.sameLongTermSongs.map(this.renderSongs)}
        </div>
      </div>
    );
  } 
}
export default App;
