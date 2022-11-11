import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import SpotifyClient from '../components/fetch'


export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const spotify = new SpotifyClient("d2282765f7724f5db46bbea51e6f75f3", "f0228c2e284248f5877c7d25acf4ce8f");
    spotify.getUsersSavedAlbums().then((res: any) => res.json()).then(r => console.log(r))
    // https://open.spotify.com/playlist/1lXY618HWkwYKJWBRYR4MK?si=f031e0e898124813
  }, [])
  
  return (
    <div>
    Test
    </div>
  )
}
