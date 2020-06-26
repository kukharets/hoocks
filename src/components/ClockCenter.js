import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {calculateClockAngle} from "../helpers/calculateClockAngle";
import ClockRight from "./ClockRight";
import TestRender from "./TestRender";

const initialState = {seconds: 0, minutes: 0, hours: 0, secondsAngle: 0, minutesAngle: 0, hoursAngle: 0};
export const TimeContext = React.createContext({seconds: 0});

function reducer(state, action) {
  switch (action.type) {
    case 'SECONDS_INCREMENT': {
      const { payload } = action;
      let newMinutes = payload === 60 ? state.minutes + 1 : state.minutes;
      let newHours = newMinutes === 60 ? state.hours + 1 : state.hours;
      return {
        ...state,
        minutes: newMinutes,
        seconds: payload,
        hours: newHours,
        secondsAngle: calculateClockAngle(payload, "seconds"),
        minutesAngle: calculateClockAngle(newMinutes, "minutes"),
        hoursAngle: calculateClockAngle(newHours, "hours"),
      }
    }
    default:
      throw new Error();
  }
}

function ClockCenter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, secondsAngle, minutes, minutesAngle, hoursAngle } = state;
  const [localMinutes, setLocalMinutes] = useState(0);
  const secondsArrow = useRef();
  useEffect(() => {
    console.log()
    setTimeout(() => {
      setLocalMinutes(minutes + 1)
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 60 ? seconds + 1 : 0})
    }, 500);
  }, [seconds]);

  const transformValue = secondsArrow.current
    ? window.getComputedStyle(secondsArrow.current).getPropertyValue('transform')
    : 0;


  const calculateLeft = () => {
    console.warn('calculateLeft')
  }

  const memoizedCalculateLeft = useCallback(
    () => {
      console.warn("MEMO")
    },
    [minutes],
  );

  const hours = seconds > 60 ? Number(minutes/60).toFixed(0) : 0;

  return (
    <TimeContext.Provider value={{seconds}}>
      <div className="clock-wrapper">
        <div className="clock-center">
          <div className='arrow-info'>{transformValue}</div>
          <div ref={secondsArrow} style={{transform: `rotate(${secondsAngle}deg)`}} className="time-arrow-wrapper">
            <div className="time-arrow"/>
          </div>
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
