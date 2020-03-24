
import React, {useState, useEffect } from 'react';
import Player from './Player'
import styled from 'styled-components';


const Button = styled.button`
    cursor: pointer;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
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

const SpotifyControlContainer = ({ start }) => {
    const [authentication, setAuthentication] = useState({
      loggedIn: false,
      token: null
    })

    useEffect(() => {
        const token = checkSpotifyAccessToken()
            if (token) {
                setAuthentication({loggedIn: true, token})
            }
        }, []
    )
 
    const checkSpotifyAccessToken = () =>{ 
        const params = getHashParams();
        const token = params.access_token;
        return token ? token : false
    }

    const getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }

    const logout = () =>
        setAuthentication({
        loggedIn: false,
        token: null
    })

    return(
        <div>
            <h1>Spotify-Api Player</h1>
            {authentication.loggedIn ? (
                <div>
                    <Player
                        accessToken={authentication.token}
                        start={start}
                    />
                    <Button onClick={logout}>Logout</Button>
                </div>
            ) : (
                <a href='http://localhost:8888'>
                    <Button>Login to Spotify</Button>
                </a>      
                )
            }
        </div>
    )
}


export default SpotifyControlContainer