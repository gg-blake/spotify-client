import SpotifyClient from "./spotify-client";
import { SPOTIFY_CLIENT_ID , SPOTIFY_SECRET_ID , SPOTIFY_SCOPES , SPOTIFY_REDIRECT_URL} from '../common/constants'

const spotify = new SpotifyClient(SPOTIFY_CLIENT_ID, SPOTIFY_SECRET_ID, SPOTIFY_REDIRECT_URL, SPOTIFY_SCOPES);
console.log(spotify.authURL);

export default spotify;