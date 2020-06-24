import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {calculateClockAngle} from "../helpers/calculateClockAngle";
import ClockRight from "./ClockRight";
import TestRender from "./TestRender";

const initialState = {seconds: 0, minutes: 0, angle: 0};
export const TimeContext = React.createContext({seconds: 0});

function reducer(state, action) {
  switch (action.type) {
    case 'SECONDS_INCREMENT': {
      const { payload } = action;
      let newMinutes = payload == 60 ? state.minutes +1 : state.minutes;
      return {
        ...state,
        minutes: newMinutes,
        seconds: payload,
        angle: calculateClockAngle(payload, "seconds")
      }
    }
    default:
      throw new Error();
  }
}

function ClockCenter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, angle, minutes } = state;
  const [localMinutes, setLocalMinutes] = useState(0);
  const secondsArrow = useRef();
  useEffect(() => {
    console.log()
    setTimeout(() => {
      setLocalMinutes(minutes + 1)
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 60 ? seconds + 1 : 0})
    }, 1000);
  }, [seconds]);

  const transformValue = secondsArrow.current
    ? window.getComputedStyle(secondsArrow.current).getPropertyValue('transform')
    : 0;
  console.log(minutes)

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
          <div ref={secondsArrow} style={{transform: `rotate(${angle}deg)`}} className="seconds-arrow-wrapper">
            <div className="seconds-arrow"/>
          </div>
        </div>
      </div>
      <ClockRight/>
      <TestRender calculateLeft={hours}/>
    </TimeContext.Provider>
  );
}

export default ClockCenter;
