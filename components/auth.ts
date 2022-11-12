import { stringify } from "querystring";

export default class SpotifyAPI {
    clientId: string;
    clientSecret: string;
    redirectURI: string;
    authCode: Response | null;

    constructor(clientId: string, clientSecret: string, redirectURI: string = "http://localhost:3000/") {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectURI = redirectURI;
        this.authCode = null;
    }

    _authorize() {
        let options = {
            method: "GET",
            header: {
                "Access-Control-Allow-Origin":"*"
            }
        }

        let queryParams = [
            `client_id=${this.clientId}`,
            `response_type=code`,
            `redirect_uri=${this.redirectURI}`,
            `scope=${encodeURI("user-library-read")}`
        ].join('&')

        return fetch(`https://accounts.spotify.com/authorize?${queryParams}`, options)
    }

    async _getToken() {
        
        this.authCode = await this._authorize();
        await this.authCode;
        console.log(this.authCode);


    }


}