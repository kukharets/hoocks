import React, {useContext} from 'react';
import {TimeContext} from "./ClockCenter";

function ClockRight() {
  const {seconds} = useContext(TimeContext);
  console.warn(seconds)
  return (
      <div className="clock-numbers-wrapper">
        {seconds}
      </div>
  );
}

export default ClockRight;
