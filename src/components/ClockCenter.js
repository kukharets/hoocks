import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import ClockRight from "./ClockRight";
import useTimer from "../customHooks/useTimer";
import TimeArrow from "./TimeArrow";
import useFirstMountSkip from "../customHooks/useFirstMountSkip";

export const TimeContext = React.createContext({seconds: 0});

function ClockCenter() {
  const { seconds, secondsAngle, minutes, minutesAngle, hoursAngle } = useTimer();
  const [minutePassed, setMinutePassed] = useState(false);
  const [transform, setTransform] = useState(0);
  const secondsArrow = useRef();
  const nonFirstMount = useFirstMountSkip();


  useEffect(() => {
    if (nonFirstMount) {
      setMinutePassed(true);
      setTimeout(() => setMinutePassed(false), 500);
    }
  }, [minutes]);

  useLayoutEffect(() => {
    setTransform(window.getComputedStyle(secondsArrow.current).getPropertyValue('transform'))
  }, [seconds]);

  const handleHover = (value) => {
    alert(value);
  };

  const memoHandleHover = useCallback((value) => handleHover(value),[minutes]);



  return (
    <TimeContext.Provider value={{seconds}}>
      <div className={`clock-wrapper  ${minutePassed ? 'pulse' : ''}`}>
        <div className="clock-center">
          <div className='arrow-info'>{transform}</div>
          <TimeArrow ref={secondsArrow} angle={secondsAngle} type='seconds'/>
          <TimeArrow angle={minutesAngle} handleHover={memoHandleHover} type='minutes'/>
          <TimeArrow angle={hoursAngle} type='hours'/>
        </div>
      </div>
      <ClockRight/>
    </TimeContext.Provider>
  );
}

export default ClockCenter;
