import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const CLIENT_ID = '8cb420509fdf40219cdbdbc9ea852644';
const REDIRECT_URI = 'http://localhost:3000/game';
const SCOPES = 'user-read-private user-read-email user-top-read'; // Add desired scopes

const getTokenFromResponse = () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  return urlParams.get('access_token') || null;
};

const authorizeSpotify = () => {
  const scopes = encodeURIComponent(SCOPES);
  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${scopes}`;

  window.location.href = authorizeUrl;
};

const Game = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getTokenFromResponse();

    if (token) {
      spotifyApi.setAccessToken(token);
      setLoggedIn(true);
      getRandomTrack();
    }
  }, []);

  const getRandomTrack = async () => {
    try {
      setIsLoading(true);
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const randomIndex = Math.floor(Math.random() * response.items.length);
      const track = response.items[randomIndex];
      setTrackName(track.name);
      setArtistName(track.artists[0].name);
      setPreviewUrl(track.preview_url);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting random track:', error);
      setIsLoading(false);
    }
  };

  const handleGuess = (guess) => {
    if (guess.toLowerCase() === artistName.toLowerCase()) {
      alert('Correct guess!');
    } else {
      alert('Incorrect guess. Try again!');
    }
    getRandomTrack();
  };

  return (
    <div>
      <h1>Song Guesser</h1>

      {!loggedIn ? (
        <button onClick={authorizeSpotify}>Log in with Spotify</button>
      ) : (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>Guess the Artist</h2>
              <p>Track: {trackName}</p>
              <audio src={previewUrl} controls />
              <input type="text" placeholder="Your Guess" onChange={(e) => handleGuess(e.target.value)} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;