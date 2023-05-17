import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CLIENT_ID = '8cb420509fdf40219cdbdbc9ea852644';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = 'user-read-private user-read-email'; // Add desired scopes

const getTokenFromResponse = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code') || null;
};

const requestAccessToken = async (code) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${CLIENT_ID}:your_client_secret`)}`,
        },
        body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        }),
    });
    
    const data = await response.json();
    return data.access_token;
};

const Game = () => {

    // const CLIENT_ID = "8cb420509fdf40219cdbdbc9ea852644";
    // const CLIENT_SECRET = "5d0e3ffd63104079909e2b17813ea88e";
    // const REDIRECT_URI = "http://localhost:3000";
    // const AUTH_ENDPOINT = "https://account.spotify.com/authorize";
    // const RESPONSE_TYPE = "token";
    
    useEffect(() => {
        const code = getTokenFromResponse();
    
        if (code) {
          requestAccessToken(code)
            .then((accessToken) => {
              // Use the access token for API requests
              console.log('Access Token:', accessToken);
            })
            .catch((error) => {
              console.error('Error requesting access token:', error);
            });
        }
      }, []);
    
      const authorizeSpotify = () => {
        const scopes = encodeURIComponent(SCOPES);
        const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&scope=${scopes}`;
    
        window.location.href = authorizeUrl;
      };
    

    return ( 
        <div className="game">
            <h1>Before we start...</h1>
            <div className="window">
                <p>Song Guesser uses the <Link to="https://developer.spotify.com/">Spotify API</Link> which requires the user to log in with their Spotify account on their secure authentication page. Don't worry, you dont need a Premium account. Free accounts work the exact same for this app and if you don't have an account already, registering is quick and easy!</p>
                <button onClick={authorizeSpotify}>Spotify Login</button>
            </div>
        </div>
     );
}
 
export default Game;