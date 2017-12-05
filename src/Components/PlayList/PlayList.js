import React from 'react';
import './PlayList.css'; 
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
    constructor(props) {
        super(props);
        //Bind the handle name change
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
                isRemoval={true}
                onRemove={this.props.onRemove}
                tracks={this.props.playListTracks} />
            <a className="PlayList-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default PlayList;
    

