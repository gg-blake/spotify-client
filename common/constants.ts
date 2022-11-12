export const SPOTIFY_CLIENT_ID = 'd2282765f7724f5db46bbea51e6f75f3'
export const SPOTIFY_SECRET_ID = 'f0228c2e284248f5877c7d25acf4ce8f'
export const SPOTIFY_REDIRECT_URL = 'http://localhost:3000/login'
export const SPOTIFY_SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
  'user-top-read',
  'user-read-recently-played',
  'user-read-playback-position'
]
export const SPOTIFY_LINK = 'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + SPOTIFY_CLIENT_ID +
  '&scope=' + encodeURIComponent(SPOTIFY_SCOPES.join(' ')) +
  '&redirect_uri=' + encodeURIComponent(SPOTIFY_REDIRECT_URL)