import React, {useContext} from 'react';
import {TimeContext} from "./ClockCenter";

function ClockRight() {
  const {seconds} = useContext(TimeContext);
  return (
      <div className="clock-numbers-wrapper">
        {seconds}
      </div>
  );
}

export default ClockRight;
