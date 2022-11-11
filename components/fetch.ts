type LengthOfString<
  S extends string,
  Acc extends 0[] = []
> = S extends `${string}${infer $Rest}`
  ? LengthOfString<$Rest, [...Acc, 0]>
  : Acc["length"];

type IsStringOfLength<S extends string, Length extends number> = LengthOfString<S> extends Length ? true : false

function stringifyList(a: string[]) {
    let f = "";
    a.map(i => {
        f = f.concat(',', i);
    })
    f = f.slice(1);
    return f
}

function buildUrl(endpoint: string, queryParams: {[key: string]: any} | null = null) {
    const BASE_URL: string = 'https://api.spotify.com/v1';
    let queryString = "";
    console.log(queryParams)
    if (queryParams) {
        queryString += '?';
        Object.entries(queryParams).map(([key, value], index) => {
            console.log(key);
            if (index != 0) {
                queryString += "&";
            }
            if (key == "ids") {
                queryString += key.concat("=", stringifyList(queryParams[key]));
            } else if (key == "market") {
                queryString += key.concat("=", value);
            } else if (key == "limit") {
                queryString += key.concat("=", value);
            } else if (key == "offset") {
                queryString += key.concat("=", value);
            }
            
        });
    }
    console.log(queryString)
    

    let url = `${BASE_URL}${endpoint}${queryString}`;
    console.log(url);

    return url
}

type QueryParams = {[key: string]: any} | null;

export default class SpotifyClient {
    clientId: string;
    clientSecret: string;
    createdDate: Date | null;
    expiredDate: Date | null;
    accessToken: null;
    getAlbumById: any;
    getAlbumsById: any;
    getPlaylistById: any;
    getAlbumTracksById: any;
    getUsersSavedAlbums: any;
    checkUsersSavedAlbums: any;

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.createdDate = null;
        this.expiredDate = null;
        this.accessToken = null;
        this.getAlbumById = (id: string, q: QueryParams = null) => this._fetch(`/albums/${id}`, q);
        this.getAlbumsById = (q: QueryParams = null) => this._fetch(`/albums`, q);
        this.getAlbumTracksById = (id: string, q: QueryParams = null) => this._fetch(`/albums/${id}/tracks`, q);
        this.getUsersSavedAlbums = (q: QueryParams = null) => this._fetch(`/me/albums`, q);
        this.checkUsersSavedAlbums = (q: QueryParams = null) => this._fetch(``);
        this.getPlaylistById = (id: string) => this._fetch(`/playlists/${id}`);
        // https://open.spotify.com/playlist/7kut0kf3lZdVqU9YCJVFOZ?si=cc7f0435c7a745fe
        // https://open.spotify.com/album/1lXY618HWkwYKJWBRYR4MK?si=52c2a03f96d744c6
        // https://open.spotify.com/album/5TZ0bVy0tqIriXse4qk1HY?si=fd2e4b64aa694891
        // https://open.spotify.com/album/2nLOHgzXzwFEpl62zAgCEC?si=1e5fee0fa3ae4c6e
    }

    getToken() {
        if (!this.accessToken) {
            // Create a token if there is no existing token generated
            return this._makeToken();
        } else {
            // Check to see if the token has expired, if not it will generate a new token
            if (this.expiredDate.getTime() > Date.now()) {
                console.log("token is reuseable")
                console.log(this.expiredDate?.getTime());
                console.log(Date.now());
                return this.accessToken
            } else {
                console.log("token is not reusable")
                return this._makeToken();
            }
        }
    }

    logTokenCreation(token: any) {
        console.log(token);
        this.createdDate = new Date(); // Record when token was created
        this.expiredDate = new Date(this.createdDate.getTime() + 1000 * token.expires_in); // Calculate and record when token will expire
        this.accessToken = token.access_token; // Record access token string
    }

    async _makeToken() {
        /* Specify HTTP request information */
        const authOptions = {
            method: "POST",
            // The client id and client secret must be converted to base64 before being added to the header for security purposes
            headers: {"Authorization": `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`, 'Content-type': 'application/x-www-form-urlencoded'},
            // The information being requested is only from my own Spotify account, that is why we are requesting "client_credentials"
            body: 'grant_type=client_credentials',
            
        }

        /* Perform the token request */
        const token = fetch('https://accounts.spotify.com/api/token', authOptions) // Make a POST request to Spotify
        .then(response => response.json())
        .then(json => {
            this.logTokenCreation(json);
            return json
        }) // Wait for the raw data to be converted to json data
        .catch(error => console.log(error))
        .finally(() => {
            console.warn("Failed to create token")
            return null
        })

        /* Parsing token data */
        
        
        return token
    }



    async _fetch(endpoint: any, queryParams:{[key: string]: any} | null = null) {
        let token = this.getToken()
            .then(() => {
                const authOptions = {
                    method: "GET",
                    headers: {'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json'},
                    scope: "user-library-read"
                }

                console.log(authOptions);

                return fetch(buildUrl(endpoint, queryParams), authOptions);
            })
        
        return await token
        

        
    }
}