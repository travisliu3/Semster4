import { useState } from "react";


export default function ClickCounter(porps) {
    const [numClicks, setNumClicks] = useState(0);

    // function increaseNumClicks(e) { // 'e' is the current event object
    //     setNumClicks(prevClicks => prevClicks + 1);
    // }
    // return <button onClick={increaseNumClicks}>Clicks: {numClicks}</button>

    function increaseNumClicks(e, message) { // 'e' is the current event object
        console.log(message);
        console.log("e.target: ", e.target);
        setNumClicks(prevClicks => prevClicks + 1);
    }
    
    return (
        <>
            <h2>ClickCounter Component</h2>
            <p>Week 4 - Handling User Event (with event object as parameter)</p>

            <button onClick={(e) => { increaseNumClicks(e, "Hello") }}>Clicks: {numClicks}</button>
        </>
    )
}