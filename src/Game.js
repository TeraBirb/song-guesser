import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;  // developer.spotify.com
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; // developer.spotify.com
const SCOPES = 'user-read-private user-read-email user-top-read';

const getTokenFromResponse = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get("access_token") || null;
};

const authorizeSpotify = () => {
    const scopes = encodeURIComponent(SCOPES);
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${scopes}`;

    window.location.href = authorizeUrl;
};

const TOP_50_HITS = "37i9dQZEVXbLRQDuF5jeBp";

const Game = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [trackName, setTrackName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [genre, setGenre] = useState(TOP_50_HITS);
    const [genreName, setGenreName] = useState("Top 50 Hits");
    const [buttonLabels, setButtonLabels] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        const token = getTokenFromResponse();

        if (token) {
            spotifyApi.setAccessToken(token);
            setLoggedIn(true);
            getRandomTrack();
        }
    }, []);

    // const handleGenreSelect = (event) => {
    //   const value = event.target.value;
    //   setGenreName(value);
    //   switch(value) {
    //     case "top50":
    //       return setGenre('37i9dQZEVXbLRQDuF5jeBp');
    //     case "2000s":
    //       setGenre('37i9dQZF1EQn4jwNIohw50');
    //     case "2010s":
    //       setGenre('37i9dQZF1EQqedj0y9Uwvu');
    //     case "90s":
    //       setGenre('37i9dQZF1EQn2GRFTFMl2A');
    //   }

    //   getRandomTrack();
    // }

    const getRandomTrack = async () => {
        try {
            setIsLoading(true);
            // Which tracks to select from
            // USA Top 50
            const response = await spotifyApi.getPlaylistTracks(genre, {
                limit: 50,
            });
            // console.log(response);
            const randomIndex = Math.floor(
                Math.random() * response.items.length
            );
            const track = response.items[randomIndex];
            // in response, element track has child element also named "track"
            setTrackName(track.track.name);
            setArtistName(track.track.artists[0].name);
            setPreviewUrl(track.track.preview_url);
            generateChoices(response, track);
            setIsLoading(false);
        } catch (error) {
            console.error("Error getting random track:", error);
            setIsLoading(false);
        }
    };

    // populate the choices in buttons, one of them is correct
    // random number gen 1-4(a-b), selected number will be correct ans,
    // everything else will be random titles
    // how to insert name into button value

    const generateChoices = (res, correct) => {
        let randomChoices = new Array(4).fill(0);
        const correctIndex = Math.floor(Math.random() * 4);
        const correctArtist = correct.track.artists[0].name;

        // random answers
        randomChoices = randomChoices.map((choice) => {
            let randomIndex = Math.floor(Math.random() * res.items.length);
            let newElement = res.items[randomIndex].track.artists[0].name;

            // handle duplicates
            while (
                randomChoices.includes(newElement) ||
                newElement === correctArtist
            ) {
                randomIndex = Math.floor(Math.random() * res.items.length);
                newElement = res.items[randomIndex].track.artists[0].name;
            }
            // if not duplicate, add to array
            return newElement;
        });

        // correct answer
        randomChoices[correctIndex] = correctArtist;
        // console.log("correct ans " + correct.track.artists[0].name);

        setButtonLabels(randomChoices);
    };

    // handleGuess() if button.value == artistname, you win

    const handleGuess = (guess) => {
        if (guess.toLowerCase() === artistName.toLowerCase()) {
            setResultMessage("Correct guess!");
            setScore(score + 1);
        } else {
            setResultMessage(`Incorrect guess. The answer is ${artistName}.`);
        }
        setIsAnswered(true);
        setTimeout(() => {
            setIsAnswered(false);
            // Reset after 2000ms
            getRandomTrack();
        }, 2000);
    };

    return (
        <div className="game">
            {/* {loggedIn && 
      <div className="genres">
        <select className="genere-select" value={genreName} onChange={handleGenreSelect}>
          <option value="top50">Top 50 Hits</option>
          <option value="90s">90s</option>
          <option value="2000s">2000s</option>
          <option value="2010s">2010s</option>
        </select>
      </div>
      } */}

            {!loggedIn ? (
                <>
                    <h1>Before we start...</h1>
                    <p>
                        Song Guesser uses the{" "}
                        <Link to="https://developer.spotify.com/documentation/web-api">
                            Spotify API
                        </Link>{" "}
                        which requires users to log in with a Spotify account on
                        their secure authentication page. Don't worry, you don't
                        need a Premium account. Free accounts work the exact
                        same for this app. And if you don't have an account
                        already, registering is quick and easy!
                    </p>
                    <button onClick={authorizeSpotify}>
                        Log in with Spotify
                    </button>
                </>
            ) : (
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h1>Guess the Artist</h1>
                            <h3>Score: {score}</h3>
                            <p>Track: {trackName}</p>
                            <div className="player">
                                <ReactAudioPlayer
                                    src={previewUrl}
                                    volume={0.5}
                                    autoPlay
                                    controls
                                />
                            </div>
                            <div className="choices">
                                {isAnswered && (
                                    <div className="resultMessage">
                                        <h3>{resultMessage}</h3>
                                    </div>
                                )}
                                {!!!isAnswered &&
                                    buttonLabels.map((choice, index) => (
                                        <button
                                            key={index}
                                            value={choice}
                                            onClick={(e) =>
                                                handleGuess(e.target.value)
                                            }
                                        >
                                            {choice}
                                        </button>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;

// extra extras
// GENRE selection at start: top 50, 90s, 2000s, 2010s
// change genre button
