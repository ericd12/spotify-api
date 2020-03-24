import React,{useState,useEffect} from 'react'
import Spotify from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const Img = styled.img`
border: 3px solid #41c412;
border-radius: 5%;
`

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 20px;
  color: #41c412;
  border: 2px solid #41c412;
  margin: 0 1em;
  padding: 0.5em 1.5em;
  transition: 0.5s all ease-out;
  &:hover {
  background-color: #41c412;
  color: black;
}
`

const Player = ({accessToken}) => {
  const SpotifyApi = new Spotify()
  const [name, setName] = useState('')
  const [playing, setPlaying] = useState(false)
  const [song, setSong] = useState({ name: null, artists: null, image: null })
  const [skips, setSkips] = useState(0)

  

  useEffect(() => {
      SpotifyApi.setAccessToken(accessToken)
      getUserInfo().then(user => setName(user))
      getPlaybackState().then(playback => {
        const { playing, name, artists, image } = playback
        setPlaying(playing)
        setSong({ name, artists, image })
       
      })
  }, [skips])
  
  const getPlaybackState = async () => {
    const currentPlaybackState = await SpotifyApi.getMyCurrentPlaybackState()
    const { is_playing, item } = currentPlaybackState
    const { name, artists, album } = item
    const image = album.images[1].url
    
    return {
      playing: is_playing,
      name,
      image,
      artists: artists.map(artist => artist.name).join(', ')
    }
  }
  
  const getUserInfo = async () => {
    const user = await SpotifyApi.getMe()
    const hasNumber = (user) => {
      return (/\d/.test(user.display_name) ? user.email : user.display_name)
      }
      return hasNumber(user) 
    }
  
 

  const handlePlay = () => {
    playing ? SpotifyApi.pause() : SpotifyApi.play()
    setPlaying(!playing)
  }

  const handleSkip = async e => {
    const { id } = e.target
    id === 'next' ? SpotifyApi.skipToNext() : SpotifyApi.skipToPrevious()
    setPlaying(true)
    setTimeout(() => setSkips(skips + 1), 400)
  }

  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <Img src={song.image} alt={song.name} />
      <div>
        <Button id="previous" onClick={handleSkip}>
          <FontAwesomeIcon icon="backward" />
        </Button>
        <Button onClick={handlePlay}>
          {playing ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </Button>
        <Button id="next" onClick={handleSkip}>
          <FontAwesomeIcon icon="forward" />
        </Button>
      </div>
      <div>
        <h3>Title: {song.name}</h3>
        <h4>Artist: {song.artists}</h4>
      </div>
    </div>
  )
}

export default Player