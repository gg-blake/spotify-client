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
