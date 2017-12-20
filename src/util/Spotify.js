
let accessToken;
const clientId = '7d3f56b083c341258714ad1b721647d4';
const redirectUri = 'https://mode-jammming.surge.sh';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

let Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const tokenUrl = window.location.href.match(/access_token=([^&]*)/);
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (tokenUrl && expiresIn) {
            accessToken = tokenUrl[1];
            expiresIn = expiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location = spotifyUrl;
        } return accessToken;
    },

        search(term) {
            const accessToken = this.getAccessToken();
            this.getAccessToken();
            const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
            const requestHeaders = {headers: {Authorization: `Bearer ${accessToken}`} };
            return fetch(searchUrl, requestHeaders).then(response => {
                    return response.json();
                    })
            .then(jsonResponse => {
                console.log(searchUrl + requestHeaders);
                if (!jsonResponse.tracks) {
                return [];
      }
                if(jsonResponse) {
                    console.log(jsonResponse); 
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri 
                        };
                    });
                }
                 else { return; }
            });
        },

        savePlayList(name, trackURIs) {

            // If playlist is empty - do nothing 
            if (!name || !trackURIs || trackURIs.length === 0) return;
    
                // Spotify user info endpoint
        const userUrl = 'https://api.spotify.com/v1/me';
        const headers = {   Authorization: `Bearer ${accessToken}`  };
            let userId;
            let playListId;
                // Make a request to retrieve user id
            return fetch(userUrl, { headers: headers })
        // Convert the response to json
            .then(response => response.json())

           // userId = jsonResponse.id should be inside the {}
            

        // Set the userId to the returned Id
            .then(jsonResponse => { userId = jsonResponse.id 
                const createPlayListUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        // Make a post request and create a playlist with the given name
                return fetch(createPlayListUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            })
        // convert the response to json
            .then(response => response.json())
        // Set playlistId to the returned playlist Id
            .then(jsonResponse => playListId = jsonResponse.id)
        // Add tracks to the playlist
            .then(() => {
          // Spotify add tracks to playlist endpoint
          const addPlayListTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`;
          // make a post request with an array of uris to be added
          // to the playlist
                return fetch(addPlayListTracksUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                    uris: trackURIs
                    })
                });
            });
        });
    } 
};

export default Spotify;
