import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {calculateClockAngle} from "../helpers/calculateClockAngle";
import ClockRight from "./ClockRight";
import TestRender from "./TestRender";
import useTimer from "../customHooks/useTimer";
import TimeArrow from "./TimeArrow";

export const TimeContext = React.createContext({seconds: 0});

function ClockCenter() {
  const { seconds, secondsAngle, minutes, minutesAngle, hoursAngle, hours } = useTimer();
  const secondsArrow = useRef();

  const transformValue = secondsArrow.current
    ? window.getComputedStyle(secondsArrow.current).getPropertyValue('transform')
    : 0;

  const handleMinutesHover = useCallback(() => {

  }, [minutes]);

  const handleMinutesHover1 = () => {


  };

  return (
    <TimeContext.Provider value={{seconds}}>
      <div className="clock-wrapper">
        <div className="clock-center">
          <div className='arrow-info'>{transformValue}</div>
          <div ref={secondsArrow} style={{transform: `rotate(${secondsAngle}deg)`}} className="time-arrow-wrapper">
            <div className="time-arrow"/>
          </div>
          <TimeArrow angle={minutesAngle} arrowClass={'time-arrow'} wrapperClass={'minutes-arrow-wrapper'} handleHover={handleMinutesHover1}/>
          <div style={{transform: `rotate(${minutesAngle}deg)`}} className="minutes-arrow-wrapper">
            <div className="time-arrow"/>
          </div>
          <div style={{transform: `rotate(${hoursAngle}deg)`}} className="hours-arrow-wrapper">
            <div className="time-arrow-hour"/>
          </div>
        </div>
      </div>
      <ClockRight/>
      <TestRender calculateLeft={hours}/>
    </TimeContext.Provider>
  );
}

export default ClockCenter;
