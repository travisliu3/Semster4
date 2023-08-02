import { useState, useEffect } from "react";

export default function Clock(props) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(new Date());
        // update the date once every second
        const timerID = setInterval(() => {
          setDate(new Date());
        }, 1000);
        return () => {
          // clean up the timer
          clearInterval(timerID);
        };
    }, []);

    return (
      <>
        <h2>Clock Component</h2>
        <p>Week 3 - Component: Adding "state" and Using Hooks - useState, useEffect</p>
        <p>Locale: {props.locale}: <mark>{date?.toLocaleTimeString(props.locale)}</mark></p>
      </>
    );
}