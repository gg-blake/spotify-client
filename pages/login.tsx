import { useEffect, useState } from 'react'
import SpotifyClient from '../components/spotify-client'
import { useRouter } from 'next/router'
import spotify from '../components/spotify-service'


export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            spotify.authorize(router.query.code as string);
        }
    }, [router.isReady])


    async function refresh() {
        spotify.skipPlaybackToNext();
    }
    
    return (
        <div>
            <div onClick={() => refresh()} className="w-auto h-6 bg-slate-200 font-sans text-black">Click to Refresh Token</div>
        </div>
    )
}
