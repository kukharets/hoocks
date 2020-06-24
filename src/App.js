import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {calculateClockAngle} from "./helpers/calculateClockAngle";

function App() {
  const [angle, setAngle] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds + 1)
    }, 1000);
    //setAngle(calculateClockAngle(seconds, "seconds"));
  }, [seconds]);

  console.log("Seconds: ", seconds);
  //console.log("Angle: ", angle);

  return (
    <div className="app">
      <div className="clock-wrapper">
        <div className="clock-center">
          <div style={{transform: `rotate(${angle}deg)`}} className="seconds-arrow-wrapper">
            <div className="seconds-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
