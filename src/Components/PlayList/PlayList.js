import React from 'react';
import './PlayList.css'; 
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
    constructor(props) {
        super(props);
        //Bind the handle name change
 //   this.onNameChange = this.onNameChange.bind(this); //correct?
        this.handleNameChange = this.handleNameChange.bind(this); //correct?
    }

    //Method to handle name change
    handleNameChange(event) {
        this.props.onNameChange(event.target.value); 
    }

    render() {
        return (  
            <div className="PlayList">
                <input 
                    onChange={this.handleNameChange}
                    value={this.props.name}
                    defaultValue={'New PlayList'}/>
            <TrackList 
                onRemove={this.props.onRemove}
                tracks={this.props.playListTracks} />
            <a className="PlayList-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default PlayList;


//<!-- When a user requests data from Spotify, the JSON response will include a set of song tracks. Each track will contain a field for name, artist, and album. For each track in the results list, your Jammming web app will display the song name, artist, and album. -->