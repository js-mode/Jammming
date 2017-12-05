import React from 'react';
import './TrackList.css'; 
import Track from '../Track/Track';

class TrackList extends React.Component {

    //Render TrackList component and everything from tracks array
    render() {
        return (    
        <div className="TrackList">
            {this.props.tracks.map(track =>              
            <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove}  key={track.id} /> )}
        </div>
        );
    }
}

export default TrackList;
