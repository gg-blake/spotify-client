import spotify from '../components/spotify-service'
import Link from 'next/link'
import { SPOTIFY_LINK } from '../common/constants'





export default function Home() {
  
  return (
    <div>
      <Link href={spotify.authURL} >
        Log in
      </Link>
    </div>
  )
}


