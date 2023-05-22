import React from "react";
import { useEffect } from "react";

const Callback = () => {

// Window, score on top, middle is song 1 out of 5, play button, can only play
// and replay
// multiple choice bottom 4 choices, random strings from lyrics
// or random strings from other song titles?
// Play function, checks if there is no current game
// iterate 5 times

const [showElement,setShowElement] = React.useState(true)
  useEffect( ()=>{
    setTimeout( () => {
      setShowElement(false)
         }, 3000);
       },
   [])

    return (  
        <div className="callback">
            {showElement && <h3>Login Success!</h3>} 
            {!showElement && <h2>Game window</h2>} 
        </div>
    );
}
 
export default Callback;