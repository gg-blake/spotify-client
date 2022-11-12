import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import SpotifyClient from '../components/fetch'
import SpotifyAPI from '../components/auth'
import { useRouter } from 'next/router'
import Spotify from '../components/spotify'
import { SPOTIFY_CLIENT_ID , SPOTIFY_SECRET_ID } from '../common/constants'


export default function Login() {
    const router = useRouter()
    const [message, setMessage] = useState<string>('Please wait...')

    let spotify = new Spotify(SPOTIFY_CLIENT_ID, SPOTIFY_SECRET_ID);

    useEffect(() => {
        

        if (router.isReady) {
            spotify.authorize(router.query.code as string);
        }
    }, [router.isReady])


    async function refresh() {
        await spotify._getRefresh();
        
        // https://open.spotify.com/album/2Ek1q2haOnxVqhvVKqMvJe?si=tZlm1x1cSDm5NGagv1_SRQ (ye)
        // https://open.spotify.com/album/7gsWAHLeT0w7es6FofOXk1?si=LIxYRqHjRXyGWaiFAirfdQ (life of pablo)
        // https://open.spotify.com/album/2ODvWsOgouMbaA5xf0RkJe?si=zcug0v1aScugW5eQWCvtBQ (starboy)
        let AlbumList = ['2Ek1q2haOnxVqhvVKqMvJe', '7gsWAHLeT0w7es6FofOXk1', '2ODvWsOgouMbaA5xf0RkJe'];
        spotify.saveShowsForUser({"ids": ["6lAcNYOQD9Rs9jEp3iUiDg"]});
        
    
    }



    /*
    const authorize = async () => {
        const response = await spotify.getToken(router.query.code as string)
        if (!response) return setMessage('something went wrong..')

        localStorage.setItem('accessToken', response.access_token)
        localStorage.setItem('refreshToken', response.refresh_token)

        setMessage(`authorized! \n${JSON.stringify(response)}`)
    }
    */
    
    return (
        <div>
        {message}
        <div onClick={() => refresh()} className="w-auto h-6 bg-slate-200 font-sans text-black">Click to Refresh Token</div>
        </div>
    )
}
