import { SPOTIFY_REDIRECT_URL, SPOTIFY_SECRET_ID, SPOTIFY_CLIENT_ID } from "../common/constants";
import axios from "./axios";
import qs from 'qs';

function stringifyList(a: string[]) {
    let f = "";
    a.map(i => {
        f = f.concat(',', i);
    })
    f = f.slice(1);
    return f
}

function _buildUrl(endpoint: string, queryParams: {[key: string]: any} | null = null) {
    const BASE_URL: string = 'https://api.spotify.com/v1';
    let queryString = "";
    if (queryParams) {
        queryString += '?';
        Object.entries(queryParams).map(([key, value], index) => {
            if (index != 0) {
                queryString += "&";
            }
            if ([
                "ids",
                "include_groups",
                "seed_artists",
                "seed_genres",
                "seed_tracks",
                "type",
                "additonal_types",
                "uris"
            ].includes(key)) {
                queryString += key.concat("=", stringifyList(queryParams[key]));
            } else if ([
                "country", 
                "market", 
                "limit", 
                "offset",
                "max_acousticness",
                "max_danceability",
                "max_duration_ms",
                "max_energy",
                "max_instrumentalness",
                "max_key",
                "max_liveness",
                "max_loudness",
                "max_mode",
                "max_popularity",
                "max_speechiness",
                "max_tempo",
                "max_time_signature",
                "max_valence",
                "min_acousticness",
                "min_danceability",
                "min_duration_ms",
                "min_energy",
                "min_instrumentalness",
                "min_key",
                "min_liveness",
                "min_loudness",
                "min_mode",
                "min_popularity",
                "min_speechiness",
                "min_tempo",
                "min_time_signature",
                "min_valence",
                "target_acousticness",
                "target_danceability",
                "target_duration_ms",
                "target_energy",
                "target_instrumentalness",
                "target_key",
                "target_liveness",
                "target_loudness",
                "target_mode",
                "target_popularity",
                "target_speechiness",
                "target_tempo",
                "target_time_signature",
                "target_valence",
                "include_external",
                "position"
            ].includes(key)) {
                queryString += key.concat("=", value);
            } else if (key == "q") {
                queryString += key.concat("=", encodeURI(value));
            }
            
        });
    }

    let url = `${BASE_URL}${endpoint}${queryString}`;

    console.log(url);

    return url
}



type QueryParams = {[key: string]: any} | null;
type BodyParams = {[key: string]: any} | null;

class Spotify {
    clientId: string;
    clientSecret: string;
    redirectURL: string;
    accessToken: string | null;
    refreshToken: string | null;
    code: string | null;
    getAlbum: any;
    getAlbums: any;
    getAlbumTracks: any;
    getUsersSavedAlbums: any;
    saveAlbumsForUser: any;
    removeUsersSavedAlbums: any;
    checkUsersSavedAlbums: any;
    getNewReleases: any;
    getArtist: any;
    getArtists: any;
    getArtistAlbums: any;
    getArtistTopTracks: any;
    getArtistRelatedArtists: any;
    getShow: any;
    getShows: any;
    getShowEpisodes: any;
    getUsersSavedShows: any;
    saveShowsForUser: any;
    removeUsersSavedShows: any;
    checkUsersSavedShows: any;
    getEpisode: any;
    getSeveralEpisodes: any;
    getUsersSavedEpisodes: any;
    saveEpisodesForUser: any;
    removeUsersSavedEpisodes: any;
    checkUsersSavedEpisodes: any;
    getAudiobook: any;
    getAudiobooks: any;
    getAudiobookChapters: any;
    getUsersSavedAudiobooks: any;
    saveAudiobooksForUser: any;
    removeUsersSavedAudiobooks: any;
    checkUsersSavedAudiobooks: any;
    getChapter: any;
    getChapters: any;
    getTrack: any;
    getTracks: any;
    getUsersSavedTracks: any;
    saveTracksForUser: any;
    removeUsersSavedTracks: any;
    checkUsersSavedTracks: any;
    getAudioFeaturesForTracks: any;
    getAudioFeaturesForTrack: any;
    getAudioAnalysisForTrack: any;
    getRecommendations: any;
    search: any;
    getCurrentUsersProfile: any;
    getUsersTopItems: any;
    getUsersProfile: any;
    followPlaylist: any;
    unfollowPlaylist: any;
    getFollowing: any;
    follow: any;
    unfollow: any;
    isFollowing: any;
    isFollowingPlaylist: any;
    getPlaylist: any;
    changePlaylistDetails: any;
    getPlaylistTracks: any;
    addTracksToPlaylist: any;
    updatePlaylistTracks: any;
    removePlaylistTracks: any;
    getCurrentUsersPlaylists: any;
    getUsersPlaylists: any;
    createPlaylist: any;
    getFeaturedPlaylists: any;
    getCategorysPlaylists: any;
    getPlaylistCoverImage: any;
    addPlaylistCoverImage: any;
    getBrowseCategories: any;
    getBrowseCategory: any;
    getGenreSeeds: any;
    getPlaybackState: any;
    transferPlayback: any;
    getAvailableDevices: any;
    getCurrentlyPlaying: any;
    startResumePlayback: any;
    pausePlayback: any;
    skipPlaybackToNext: any;
    skipPlaybackToPrevious: any;
    seekPlayback: any;
    setRepeatMode: any;
    setPlaybackVolume: any;
    toggleShuffle: any;
    getRecentlyPlayed: any;
    getQueue: any;
    addToQueue: any;
    getAvailableMarkets: any;

    


    constructor(clientId: string, clientSecret: string, redirectURL: string = 'http://localhost:3000/login') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectURL = redirectURL;
        this.accessToken = null;
        this.refreshToken = null;
        this.code = null;
        this.initMethods();
    }
    
    initMethods() {
        // Albums
        this.getAlbum = (id: string, q: QueryParams = null) => this._get(`/albums/${id}`, q);
        this.getAlbums = (q: QueryParams = null) => this._get(`/albums`, q);
        this.getAlbumTracks = (id: string, q: QueryParams = null) => this._get(`/albums/${id}/tracks`, q);
        this.getUsersSavedAlbums = (q: QueryParams = null) => this._get(`/me/albums`, q);
        this.saveAlbumsForUser = (q: QueryParams = null) => this._put(`/me/albums`, q, q);
        this.removeUsersSavedAlbums = (q: QueryParams = null) => this._delete(`/me/albums`, q, q);
        this.checkUsersSavedAlbums = (q: QueryParams = null) => this._get(`/me/albums/contains`, q);
        this.getNewReleases = (q: QueryParams = null) => this._get(`/browse/new-releases`, q);
        // Artists
        this.getArtist = (id: string, q: QueryParams = null) => this._get(`/artists/${id}`, q);
        this.getArtists = (q: QueryParams = null) => this._get(`/artists`, q);
        this.getArtistAlbums = (id: string, q: QueryParams = null) => this._get(`/artists/${id}/albums`, q);
        this.getArtistTopTracks = (id: string, q: QueryParams = null) => this._get(`/artists/${id}/top-tracks`, q);
        this.getArtistRelatedArtists = (id: string) => this._get(`/artists/${id}/related-artists`);
        // Shows
        this.getShow = (id: string, q: QueryParams = null) => this._get(`/shows/${id}`, q);
        this.getShows = (q: QueryParams = null) => this._get(`/shows`, q);
        this.getShowEpisodes = (id: string, q: QueryParams = null) => this._get(`/shows/${id}/episodes`, q);
        this.getUsersSavedShows = (q: QueryParams = null) => this._get(`/me/shows`, q);
        this.saveShowsForUser = (q: QueryParams = null) => this._put(`/me/shows`, q, q);
        this.removeUsersSavedShows = (q: QueryParams = null) => this._delete(`/me/shows`, q, q);
        this.checkUsersSavedShows = (q: QueryParams = null) => this._get(`/me/shows/contains`, q);
        // Episodes
        this.getEpisode = (id: string, q: QueryParams = null) => this._get(`/episodes/${id}`, q);
        this.getSeveralEpisodes = (q: QueryParams = null) => this._get(`/episodes`, q);
        this.getUsersSavedEpisodes = (q: QueryParams = null) => this._get(`/me/episodes`, q);
        this.saveEpisodesForUser = (q: QueryParams = null) => this._put(`/me/episodes`, q, q);
        this.removeUsersSavedEpisodes = (q: QueryParams = null) => this._delete(`/me/episodes`, q, q);
        this.checkUsersSavedEpisodes = (q: QueryParams = null) => this._get(`/me/episodes/contains`, q);
        // Audiobooks
        this.getAudiobook = (id: string, q: QueryParams = null) => this._get(`/audiobooks/${id}`, q);
        this.getAudiobooks = (q: QueryParams = null) => this._get(`/audiobooks`, q);
        this.getAudiobookChapters = (id: string, q: QueryParams = null) => this._get(`/audiobooks/${id}/chapters`, q);
        this.getUsersSavedAudiobooks = (q: QueryParams = null) => this._get(`/me/audiobooks`, q);
        this.saveAudiobooksForUser = (q: QueryParams = null) => this._put(`/me/audiobooks`, q, q);
        this.removeUsersSavedAudiobooks = (q: QueryParams = null) => this._delete(`/me/audiobooks`, q, q);
        this.checkUsersSavedAudiobooks = (q: QueryParams = null) => this._get(`/me/audiobooks/contains`, q);
        // Chapters
        this.getChapter = (id: string, q: QueryParams = null) => this._get(`/chapters/${id}`, q);
        this.getChapters = (q: QueryParams = null) => this._get(`/chapters`, q);
        // Tracks
        this.getTrack = (id: string, q: QueryParams = null) => this._get(`/tracks/${id}`, q);
        this.getTracks = (q: QueryParams = null) => this._get(`/tracks`, q);
        this.getUsersSavedTracks = (q: QueryParams = null) => this._get(`/me/tracks`, q);
        this.saveTracksForUser = (q: QueryParams = null) => this._put(`/me/tracks`, q, q);
        this.removeUsersSavedTracks = (q: QueryParams = null) => this._delete(`/me/tracks`, q, q);
        this.checkUsersSavedTracks = (q: QueryParams = null) => this._get(`/me/tracks/contains`, q);
        this.getAudioFeaturesForTrack = (id: string) => this._get(`/audio-features/${id}`);
        this.getAudioFeaturesForTracks = (q: QueryParams = null) => this._get(`/audio-features`, q);
        this.getAudioAnalysisForTrack = (id: string) => this._get(`/audio-analysis/${id}`);
        this.getRecommendations = (q: QueryParams = null) => this._get(`/recommendations`, q);
        // Search
        this.search = (q: QueryParams = null) => this._get(`/search`, q);
        // Users
        this.getCurrentUsersProfile = (q: QueryParams = null) => this._get(`/me`, q);
        this.getUsersTopItems = (q: QueryParams = null) => this._get(`/me/top`, q);
        this.getUsersProfile = (id: string, q: QueryParams = null) => this._get(`/users/${id}`, q);
        this.followPlaylist = (id: string, q: QueryParams = null) => this._put(`/playlists/${id}/followers`, q, q);
        this.unfollowPlaylist = (id: string, q: QueryParams = null) => this._delete(`/playlists/${id}/followers`, q, q);
        this.getFollowing = (q: QueryParams = null) => this._get(`/me/following`, q);
        this.follow = (q: QueryParams = null) => this._put(`/me/following`, q, q);
        this.unfollow = (q: QueryParams = null) => this._delete(`/me/following`, q, q);
        this.isFollowing = (q: QueryParams = null) => this._get(`/me/following/contains`, q);
        this.isFollowingPlaylist = (id: string, q: QueryParams = null) => this._get(`/playlists/${id}/followers/contains`, q);
        // Playlists
        this.getPlaylist = (id: string, q: QueryParams = null) => this._get(`/playlists/${id}`, q);
        this.changePlaylistDetails = (id: string, q: QueryParams = null) => this._put(`/playlists/${id}`, q, q);
        this.getPlaylistTracks = (id: string, q: QueryParams = null) => this._get(`/playlists/${id}/tracks`, q);
        this.addTracksToPlaylist = (id: string, q: QueryParams = null) => this._post(`/playlists/${id}/tracks`, q, q);
        this.updatePlaylistTracks = (id: string, q: QueryParams = null) => this._put(`/playlists/${id}/tracks`, q, q);
        this.removePlaylistTracks = (id: string, q: QueryParams = null): any => this._delete(`/playlists/${id}/tracks`, q, q);
        this.getCurrentUsersPlaylists = (q: QueryParams = null) => this._get(`/me/playlists`, q);
        this.getUsersPlaylists = (id: string, q: QueryParams = null) => this._get(`/users/${id}/playlists`, q);
        this.createPlaylist = (id: string, q: QueryParams = null) => this._post(`/users/${id}/playlists`, q, q);
        this.getFeaturedPlaylists = (q: QueryParams = null) => this._get(`/browse/featured-playlists`, q);
        this.getCategorysPlaylists = (id: string, q: QueryParams = null) => this._get(`/browse/categories/${id}/playlists`, q);
        this.getPlaylistCoverImage = (id: string) => this._get(`/playlists/${id}/images`);
        this.addPlaylistCoverImage = (id: string, q: QueryParams = null) => this._put(`/playlists/${id}/images`, q, q);
        // Categories
        this.getBrowseCategories = (q: QueryParams = null) => this._get(`/browse/categories`, q);
        this.getBrowseCategory = (id: string, q: QueryParams = null) => this._get(`/browse/categories/${id}`, q);
        // Genres
        this.getGenreSeeds = () => this._get(`/recommendations/available-genre-seeds`);
        // Player
        this.getPlaybackState = (q: QueryParams = null) => this._get(`/me/player`, q);
        this.transferPlayback = (q: QueryParams = null) => this._put(`/me/player`, q, q);
        this.getAvailableDevices = (q: QueryParams = null) => this._get(`/me/player/devices`, q);
        this.getCurrentlyPlaying = (q: QueryParams = null) => this._get(`/me/player/currently-playing`, q);
        this.startResumePlayback = (q: QueryParams = null) => this._put(`/me/player/play`, q, q);
        this.pausePlayback = (q: QueryParams = null) => this._put(`/me/player/pause`, q, q);
        this.skipPlaybackToNext = (q: QueryParams = null) => this._post(`/me/player/next`, q, q);
        this.skipPlaybackToPrevious = (q: QueryParams = null) => this._post(`/me/player/previous`, q, q);
        this.seekPlayback = (q: QueryParams = null) => this._put(`/me/player/seek`, q, q);
        this.setRepeatMode = (q: QueryParams = null) => this._put(`/me/player/repeat`, q, q);
        this.setPlaybackVolume = (q: QueryParams = null) => this._put(`/me/player/volume`, q, q);
        this.toggleShuffle = (q: QueryParams = null) => this._put(`/me/player/shuffle`, q, q);
        this.getRecentlyPlayed = (q: QueryParams = null) => this._get(`/me/player/recently-played`, q);
        this.getQueue = (q: QueryParams = null) => this._get(`/me/player/queue`, q);
        this.addToQueue = (q: QueryParams = null) => this._post(`/me/player/queue`, q, q);
        // Markets
        this.getAvailableMarkets = () => this._get(`/markets`);
        // TODO : Start after remove playlist items for checking new query params

    }

    async getToken(code: string) {
        console.log(code)
        const request = await axios.post('https://accounts.spotify.com/api/token', {
        code,
        redirect_uri: this.redirectURL,
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret
        }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
        // `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`)}`
        console.log(request.data)
        if (request.status !== 200) return
        return request.data
    }

    async _getRefresh() {
        console.log(this.refreshToken)
        console.log(this.accessToken)

        let data = {
            code: this.code,
            redirect_uri: this.redirectURL,
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
            client_id: this.clientId,
            client_secret: this.clientSecret
        }

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const request = await axios.post('https://accounts.spotify.com/api/token', data, config)
        // `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`)}`
        console.log(request.data)
        if (request.status !== 200) return
        return request.data
    }

    async authorize(code: string) {
        const response = await this.getToken(code)
        if (!response) return "something went wrong..."
    
        console.log(response);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.code = code;
    
        console.log(response);
        return response
    }

    async _get(endpoint: any, queryParams:{[key: string]: any} | null = null) {
        const authOptions = {
            headers: {'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json'},
            
        }

        const request = await axios.get(_buildUrl(endpoint, queryParams), authOptions);
        if (request.status === 403) {
            this._getRefresh()
            return
        }

        return request.data
    }

    async _put(endpoint: any, body: BodyParams = null, query: QueryParams = null) {
        const options = {
            headers: {'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json'},
        }

        const request = await axios.put(_buildUrl(endpoint, query), body, options);

        if (request.status === 403) {
            this._getRefresh()
            return
        }
    }

    async _delete(endpoint: any, body: BodyParams = null, query: QueryParams = null) {
        const options = {
            headers: {'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json'},
        }

        const request = await axios.delete(_buildUrl(endpoint, query), options);

        if (request.status === 403) {
            this._getRefresh()
            return
        }
    }

    async _post(endpoint: any, body: BodyParams = null, query: QueryParams = null) {
        const options = {
            headers: {'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json'},
        }

        const request = await axios.post(_buildUrl(endpoint, query), body, options);

        if (request.status === 403) {
            this._getRefresh()
            return
        }

        return request.data
    }

}

export default Spotify
