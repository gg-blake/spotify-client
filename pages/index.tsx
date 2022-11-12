import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import SpotifyClient from '../components/fetch'
import SpotifyAPI from '../components/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { SPOTIFY_LINK } from '../common/constants'


export default function Home() {
  // const [data, setData] = useState();
  // const router = useRouter()

  useEffect(() => {
    // const spotify = new SpotifyAPI("d2282765f7724f5db46bbea51e6f75f3", "f0228c2e284248f5877c7d25acf4ce8f");
    // spotify._authorize().then((res: any) => console.log(res))
    // https://open.spotify.com/playlist/1lXY618HWkwYKJWBRYR4MK?si=f031e0e898124813
  }, [])
  
  return (
    <div>
      <Link
        href={SPOTIFY_LINK}
      >
        Log in
      </Link>
    </div>
  )
}
