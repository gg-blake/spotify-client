import axios from "./axios";

const ARRAY_QUERIES = [
    "ids",
    "include_groups",
    "seed_artists",
    "seed_genres",
    "seed_tracks",
    "type",
    "additonal_types",
    "uris"
];

const STRING_QUERIES = [
    "uri",
    "before",
    "after",
    "state",
    "volume_percent",
    "position_ms",
    "device_id",
    "timestamp",
    "locale",
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
];

const BASE_URL = "https://api.spotify.com/v1";

function stringifyList(a: string[]) {
    let f = "";
    a.map(i => {
        f = f.concat(",", i);
    })
    f = f.slice(1);
    return f
}

type QueryBodyParams = {[key: string]: any} | null;

function _buildUrl(endpoint: string, queryParams: QueryBodyParams = null) {
    
    let queryString = "";
    if (queryParams) {
        queryString += "?";
        Object.entries(queryParams).map(([key, value], index) => {
            if (index != 0) {
                queryString += "&";
            }
            if (ARRAY_QUERIES.includes(key)) {
                queryString += key.concat("=", stringifyList(queryParams[key]));
            } else if (STRING_QUERIES.includes(key)) {
                queryString += key.concat("=", value);
            } else if (key == "q") {
                queryString += key.concat("=", encodeURI(value));
            }
        });
    }

    let url = `${BASE_URL}${endpoint}${queryString}`;

    return url
}



export default class SpotifyClient {
    _clientId: string;
    _clientSecret: string;
    _redirectURL: string;
    _scopes: string[];
    _accessToken: string | null;
    _refreshToken: string | null;
    _code: string | null;
    authURL: string;
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

    constructor(clientId: string, clientSecret: string, redirectURL: string = "http://localhost:3000/", scopes: string[] = []) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._redirectURL = redirectURL;
        this._scopes = scopes;
        this._accessToken = null;
        this._refreshToken = null;
        this._code = null;
        this.authURL = "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" + clientId +
        "&scope=" + encodeURIComponent(scopes.join(" ")) +
        "&redirect_uri=" + encodeURIComponent(redirectURL);

        // Albums
        this.getAlbum = (id: string, q: QueryBodyParams = null) => this._get(`/albums/${id}`, q);
        this.getAlbums = (q: QueryBodyParams = null) => this._get(`/albums`, q);
        this.getAlbumTracks = (id: string, q: QueryBodyParams = null) => this._get(`/albums/${id}/tracks`, q);
        this.getUsersSavedAlbums = (q: QueryBodyParams = null) => this._get(`/me/albums`, q);
        this.saveAlbumsForUser = (q: QueryBodyParams = null) => this._put(`/me/albums`, q, q);
        this.removeUsersSavedAlbums = (q: QueryBodyParams = null) => this._delete(`/me/albums`, q, q);
        this.checkUsersSavedAlbums = (q: QueryBodyParams = null) => this._get(`/me/albums/contains`, q);
        this.getNewReleases = (q: QueryBodyParams = null) => this._get(`/browse/new-releases`, q);
        // Artists
        this.getArtist = (id: string, q: QueryBodyParams = null) => this._get(`/artists/${id}`, q);
        this.getArtists = (q: QueryBodyParams = null) => this._get(`/artists`, q);
        this.getArtistAlbums = (id: string, q: QueryBodyParams = null) => this._get(`/artists/${id}/albums`, q);
        this.getArtistTopTracks = (id: string, q: QueryBodyParams = null) => this._get(`/artists/${id}/top-tracks`, q);
        this.getArtistRelatedArtists = (id: string) => this._get(`/artists/${id}/related-artists`);
        // Shows
        this.getShow = (id: string, q: QueryBodyParams = null) => this._get(`/shows/${id}`, q);
        this.getShows = (q: QueryBodyParams = null) => this._get(`/shows`, q);
        this.getShowEpisodes = (id: string, q: QueryBodyParams = null) => this._get(`/shows/${id}/episodes`, q);
        this.getUsersSavedShows = (q: QueryBodyParams = null) => this._get(`/me/shows`, q);
        this.saveShowsForUser = (q: QueryBodyParams = null) => this._put(`/me/shows`, q, q);
        this.removeUsersSavedShows = (q: QueryBodyParams = null) => this._delete(`/me/shows`, q, q);
        this.checkUsersSavedShows = (q: QueryBodyParams = null) => this._get(`/me/shows/contains`, q);
        // Episodes
        this.getEpisode = (id: string, q: QueryBodyParams = null) => this._get(`/episodes/${id}`, q);
        this.getSeveralEpisodes = (q: QueryBodyParams = null) => this._get(`/episodes`, q);
        this.getUsersSavedEpisodes = (q: QueryBodyParams = null) => this._get(`/me/episodes`, q);
        this.saveEpisodesForUser = (q: QueryBodyParams = null) => this._put(`/me/episodes`, q, q);
        this.removeUsersSavedEpisodes = (q: QueryBodyParams = null) => this._delete(`/me/episodes`, q, q);
        this.checkUsersSavedEpisodes = (q: QueryBodyParams = null) => this._get(`/me/episodes/contains`, q);
        // Audiobooks
        this.getAudiobook = (id: string, q: QueryBodyParams = null) => this._get(`/audiobooks/${id}`, q);
        this.getAudiobooks = (q: QueryBodyParams = null) => this._get(`/audiobooks`, q);
        this.getAudiobookChapters = (id: string, q: QueryBodyParams = null) => this._get(`/audiobooks/${id}/chapters`, q);
        this.getUsersSavedAudiobooks = (q: QueryBodyParams = null) => this._get(`/me/audiobooks`, q);
        this.saveAudiobooksForUser = (q: QueryBodyParams = null) => this._put(`/me/audiobooks`, q, q);
        this.removeUsersSavedAudiobooks = (q: QueryBodyParams = null) => this._delete(`/me/audiobooks`, q, q);
        this.checkUsersSavedAudiobooks = (q: QueryBodyParams = null) => this._get(`/me/audiobooks/contains`, q);
        // Chapters
        this.getChapter = (id: string, q: QueryBodyParams = null) => this._get(`/chapters/${id}`, q);
        this.getChapters = (q: QueryBodyParams = null) => this._get(`/chapters`, q);
        // Tracks
        this.getTrack = (id: string, q: QueryBodyParams = null) => this._get(`/tracks/${id}`, q);
        this.getTracks = (q: QueryBodyParams = null) => this._get(`/tracks`, q);
        this.getUsersSavedTracks = (q: QueryBodyParams = null) => this._get(`/me/tracks`, q);
        this.saveTracksForUser = (q: QueryBodyParams = null) => this._put(`/me/tracks`, q, q);
        this.removeUsersSavedTracks = (q: QueryBodyParams = null) => this._delete(`/me/tracks`, q, q);
        this.checkUsersSavedTracks = (q: QueryBodyParams = null) => this._get(`/me/tracks/contains`, q);
        this.getAudioFeaturesForTrack = (id: string) => this._get(`/audio-features/${id}`);
        this.getAudioFeaturesForTracks = (q: QueryBodyParams = null) => this._get(`/audio-features`, q);
        this.getAudioAnalysisForTrack = (id: string) => this._get(`/audio-analysis/${id}`);
        this.getRecommendations = (q: QueryBodyParams = null) => this._get(`/recommendations`, q);
        // Search
        this.search = (q: QueryBodyParams = null) => this._get(`/search`, q);
        // Users
        this.getCurrentUsersProfile = (q: QueryBodyParams = null) => this._get(`/me`, q);
        this.getUsersTopItems = (q: QueryBodyParams = null) => this._get(`/me/top`, q);
        this.getUsersProfile = (id: string, q: QueryBodyParams = null) => this._get(`/users/${id}`, q);
        this.followPlaylist = (id: string, q: QueryBodyParams = null) => this._put(`/playlists/${id}/followers`, q, q);
        this.unfollowPlaylist = (id: string, q: QueryBodyParams = null) => this._delete(`/playlists/${id}/followers`, q, q);
        this.getFollowing = (q: QueryBodyParams = null) => this._get(`/me/following`, q);
        this.follow = (q: QueryBodyParams = null) => this._put(`/me/following`, q, q);
        this.unfollow = (q: QueryBodyParams = null) => this._delete(`/me/following`, q, q);
        this.isFollowing = (q: QueryBodyParams = null) => this._get(`/me/following/contains`, q);
        this.isFollowingPlaylist = (id: string, q: QueryBodyParams = null) => this._get(`/playlists/${id}/followers/contains`, q);
        // Playlists
        this.getPlaylist = (id: string, q: QueryBodyParams = null) => this._get(`/playlists/${id}`, q);
        this.changePlaylistDetails = (id: string, q: QueryBodyParams = null) => this._put(`/playlists/${id}`, q, q);
        this.getPlaylistTracks = (id: string, q: QueryBodyParams = null) => this._get(`/playlists/${id}/tracks`, q);
        this.addTracksToPlaylist = (id: string, q: QueryBodyParams = null) => this._post(`/playlists/${id}/tracks`, q, q);
        this.updatePlaylistTracks = (id: string, q: QueryBodyParams = null) => this._put(`/playlists/${id}/tracks`, q, q);
        this.removePlaylistTracks = (id: string, q: QueryBodyParams = null): any => this._delete(`/playlists/${id}/tracks`, q, q);
        this.getCurrentUsersPlaylists = (q: QueryBodyParams = null) => this._get(`/me/playlists`, q);
        this.getUsersPlaylists = (id: string, q: QueryBodyParams = null) => this._get(`/users/${id}/playlists`, q);
        this.createPlaylist = (id: string, q: QueryBodyParams = null) => this._post(`/users/${id}/playlists`, q, q);
        this.getFeaturedPlaylists = (q: QueryBodyParams = null) => this._get(`/browse/featured-playlists`, q);
        this.getCategorysPlaylists = (id: string, q: QueryBodyParams = null) => this._get(`/browse/categories/${id}/playlists`, q);
        this.getPlaylistCoverImage = (id: string) => this._get(`/playlists/${id}/images`);
        this.addPlaylistCoverImage = (id: string, q: QueryBodyParams = null) => this._put(`/playlists/${id}/images`, q, q);
        // Categories
        this.getBrowseCategories = (q: QueryBodyParams = null) => this._get(`/browse/categories`, q);
        this.getBrowseCategory = (id: string, q: QueryBodyParams = null) => this._get(`/browse/categories/${id}`, q);
        // Genres
        this.getGenreSeeds = () => this._get(`/recommendations/available-genre-seeds`);
        // Player
        this.getPlaybackState = (q: QueryBodyParams = null) => this._get(`/me/player`, q);
        this.transferPlayback = (q: QueryBodyParams = null) => this._put(`/me/player`, q, q);
        this.getAvailableDevices = (q: QueryBodyParams = null) => this._get(`/me/player/devices`, q);
        this.getCurrentlyPlaying = (q: QueryBodyParams = null) => this._get(`/me/player/currently-playing`, q);
        this.startResumePlayback = (q: QueryBodyParams = null) => this._put(`/me/player/play`, q, q);
        this.pausePlayback = (q: QueryBodyParams = null) => this._put(`/me/player/pause`, q, q);
        this.skipPlaybackToNext = (q: QueryBodyParams = null) => this._post(`/me/player/next`, q, q);
        this.skipPlaybackToPrevious = (q: QueryBodyParams = null) => this._post(`/me/player/previous`, q, q);
        this.seekPlayback = (q: QueryBodyParams = null) => this._put(`/me/player/seek`, q, q);
        this.setRepeatMode = (q: QueryBodyParams = null) => this._put(`/me/player/repeat`, q, q);
        this.setPlaybackVolume = (q: QueryBodyParams = null) => this._put(`/me/player/volume`, q, q);
        this.toggleShuffle = (q: QueryBodyParams = null) => this._put(`/me/player/shuffle`, q, q);
        this.getRecentlyPlayed = (q: QueryBodyParams = null) => this._get(`/me/player/recently-played`, q);
        this.getQueue = (q: QueryBodyParams = null) => this._get(`/me/player/queue`, q);
        this.addToQueue = (q: QueryBodyParams = null) => this._post(`/me/player/queue`, q, q);
        // Markets
        this.getAvailableMarkets = () => this._get(`/markets`);
    }


    async _getToken(code: string) {
        const request = await axios.post("https://accounts.spotify.com/api/token", {
        code,
        redirect_uri: this._redirectURL,
        grant_type: "authorization_code",
        client_id: this._clientId,
        client_secret: this._clientSecret
        }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        })
        if (request.status !== 200) return
        return request.data
    }


    async _getRefresh() {
        let data = {
            code: this._code,
            redirect_uri: this._redirectURL,
            grant_type: "refresh_token",
            refresh_token: this._refreshToken,
            client_id: this._clientId,
            client_secret: this._clientSecret
        }

        let config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        const request = await axios.post("https://accounts.spotify.com/api/token", data, config)
        if (request.status !== 200) return
        return request.data
    }


    async authorize(code: string) {
        let response = await this._getToken(code);
    
        if (response) {
            localStorage.setItem("accessToken", response.access_token)
            localStorage.setItem("refreshToken", response.refresh_token)
            this._accessToken = response.access_token;
            this._refreshToken = response.refresh_token;
            this._code = code;
            return response
        }

        this._accessToken = localStorage.getItem("accessToken");
        this._refreshToken = localStorage.getItem("refreshToken");
        if (this._accessToken && this._refreshToken) {
            return
        }
    }


    async _get(endpoint: any, QueryBodyParams:{[key: string]: any} | null = null) {
        let options = {
            headers: {"Authorization": `Bearer ${this._accessToken}`, "Content-Type": "application/json"},
            
        }

        let request = await axios.get(_buildUrl(endpoint, QueryBodyParams), options);

        return request.data
    }


    async _put(endpoint: any, body: QueryBodyParams = null, query: QueryBodyParams = null) {
        let options = {
            headers: {"Authorization": `Bearer ${this._accessToken}`, "Content-Type": "application/json"},
        }

        let request = await axios.put(_buildUrl(endpoint, query), body, options);

        return request.data
    }


    async _delete(endpoint: any, body: QueryBodyParams = null, query: QueryBodyParams = null) {
        let options = {
            headers: {"Authorization": `Bearer ${this._accessToken}`, "Content-Type": "application/json"},
        }

        let request = await axios.delete(_buildUrl(endpoint, query), options);

        return request.data
    }


    async _post(endpoint: any, body: QueryBodyParams = null, query: QueryBodyParams = null) {
        let options = {
            headers: {"Authorization": `Bearer ${this._accessToken}`, "Content-Type": "application/json"},
        }

        let request = await axios.post(_buildUrl(endpoint, query), body, options);

        return request.data
    }
}
