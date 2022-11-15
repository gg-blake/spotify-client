# spotify-client
A promise-based, JavaScript library for Spotify Web API; made to simplify spotify app integration for developers.


## How to use
Create a SpotifyClient object in a separate file (i.e. "spotify-service.js") and export it to other files where needed.

### spotify-service.js
```typescript
import SpotifyClient from "./spotify-client";

const spotify = new SpotifyClient(SPOTIFY_CLIENT_ID, SPOTIFY_SECRET_ID, SPOTIFY_REDIRECT_URL, SPOTIFY_SCOPES);

export default spotify;
```





Once the client object is made, you must authorize a user. You can link to spotify authorization by accessing ```spotify.authURL```.

### index.js (NextJS Example)
```typescript
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href={spotify.authURL} >
        Log in
      </Link>
    </div>
  )
}
```





Clicking the authorization link and authorizing successfully will redirect to the specified url (NOTE: make sure your redirect url exists in your file directory), along with an authorization code query string attached.

Within the file of the specified redirect url, either at render or page ready, call the ```spotify.authorize``` method, passing in the authorization code as its only argument.

### login.js (NextJS Example)
```typescript
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import spotify from '../components/spotify-service'

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            spotify.authorize(router.query.code as string);
        }
    }, [router.isReady])
    
    return (
        ...
    )
}
```

And, you're all set! When you want to make a request to Spotify, implement the methods within the ```login.js``` file.





## Example Usecases

#### Creating and updating a playlist
```typescript
spotify.createPlaylist("226mjvs6gbx2tsrvtmuhrybdy", {
    "name": "Test Playlist 2022",
    "description": "This is a test playlist",
    "public": true,
    "collaborative": false
});

const playlist = await spotify.getPlaylist("5fWm7Rb5EMeIlna3tNRLwv");

const image = await spotify.getPlaylistCoverImage("5fWm7Rb5EMeIlna3tNRLwv");
```

#### Controlling playback and volume
```typescript
spotify.skipPlaybackToNext();
spotify.skipPlaybackToPrevious();

const currentPlayback = await spotify.getPlaybackState({
    "addtional_types": "epsiode"
});

const recentTracks = await spotify.getRecentlyPlayed({
    "after": "1484811043508"
});

spotify.addToQueue({
    "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
    "device_id": "0d1841b0976bae2a3a310dd74c0f3df354899bc8"
});
```
