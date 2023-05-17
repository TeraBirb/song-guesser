const Game = () => {

    const CLIENT_ID = "8cb420509fdf40219cdbdbc9ea852644";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://account.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return ( 
        <div className="game">
            <h1>Song Guesser!</h1>
            <div className="window">
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}}`}>
                Login</a>
            </div>
        </div>
     );
}
 
export default Game;