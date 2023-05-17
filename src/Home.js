import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [isPending, setIsPending] = useState(false);

    // possible animation, fake (or real) loading time, 
    const handleClick = () => {
        // setIsPending(true);

    }

    return ( 
        <div className="home">
            <h1>Song Guesser</h1>
            <h3>A web app by Isaiah Callano for CIS 27</h3>
            <p className="intro">A song snippet will play for 5 seconds and you have to guess the song title and artist!</p>
            {!isPending && <Link to="/game"><button onClick={ handleClick }>Play Game</button></Link>}
        </div>
     );
}
 
export default Home;