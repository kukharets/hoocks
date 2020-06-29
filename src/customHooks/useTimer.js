import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {calculateClockAngle} from "../helpers/calculateClockAngle";

const initialState = {seconds: 0, minutes: 0, hours: 0, secondsAngle: 0, minutesAngle: 0, hoursAngle: 0};


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
      }
    }
    default:
      throw new Error();
  }
}
export default function useTimes() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, minutes, hours } = state;
  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 60 ? seconds + 1 : 0})
    }, 500);
  }, [seconds]);
  const hoursAngle = useMemo(() => calculateClockAngle(hours, "hours"), [hours]);
  const minutesAngle = useMemo(() => calculateClockAngle(minutes, "minutes"), [minutes]);

  return {...state, hoursAngle, minutesAngle}
}