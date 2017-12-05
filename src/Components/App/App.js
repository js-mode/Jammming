import React from 'react'; 
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {

constructor(props) {
  super(props);
  this.state = { 
    searchResults: [],
    playListName: 'New Playlist',
    playListTracks: []
  };
  //Bound all required method to {this}
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlayListName = this.updatePlayListName.bind(this);
  this.savePlayList = this.savePlayList.bind(this);
  this.search = this.search.bind(this);
}

    // Add track to playlist if not present
    addTrack(track) {
      let currentTracks = this.state.playListTracks;
      if(!currentTracks.some(currentTracks => currentTracks.id === track.id)) {
        currentTracks.push(track); 
        this.setState({playListTracks: currentTracks}); 
      } 
    }

      // Find track by ID - remove it from the playlist array
      removeTrack(track) {
        let currentTracks = this.state.playListTracks;
        this.setState({
          playListTracks: currentTracks.filter(
          playListTrack => playListTrack.id !== track.id)}
          ); 
      }

    //Update Playlist name
    updatePlayListName(name) {
      this.setState({ playListName: name });
    }
  
      //Save PlayList with all tracks
      savePlayList() {
        let trackURIs = this.state.playListTracks.map(track => track.uri);
        Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
          this.setState({        
          playListName: 'New Playlist',
          playListTracks: []
        });
      });
    }

    search(term) {
       Spotify.search(term).then(searchResults => {
        console.log(term);
        //console.log(searchResults);
        this.setState({
        searchResults: searchResults
        });
     });
    }
  

  render() {
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar  
                    onSearch={this.search} />
          <div className="App-playList">
              <SearchResults 
                    searchResults={this.state.searchResults}
                    onAdd={this.addTrack}/>  
              <PlayList 
                    playListName={this.state.playListName} 
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlayListName}
                    onSave={this.savePlayList}
                    playListTracks={this.state.playListTracks}/>
          </div>       
      </div>
    </div>
    );
  }
} 

export default App;

 