import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { renderHook } from '@testing-library/react-hooks';
import useTimer from "./customHooks/useTimer";
import { shallow } from 'enzyme';
import ClockCenter from "./components/ClockCenter";


describe('useTimer hook test', () => {
  it('should start with initial state values', () => {
    const { result, waitForNextUpdate  }= renderHook(() => useTimer());
    expect (result.current).toStrictEqual(
      {seconds: 0, minutes: 0, hours: 0, secondsAngle: 0, minutesAngle: 0,hoursAngle: 0});
  });

  describe('when the one seconds is passed', () => {
    it('should not update minutes and hour', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useTimer());
      await waitForNextUpdate();
      expect(result.current.hours).toBe(0);
      expect(result.current.minutes).toBe(0);
    });
    it('should update seconds value', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useTimer());
      await waitForNextUpdate();
      expect(result.current.seconds).toBe(1);
    });
  })
});

describe('ClockCenter component', () => {
  it('contains a header with the "Hello world!"', () => {
    const clock = mount(<ClockCenter/>);
    expect(clock.find('.time-arrow-seconds')).toHave.lengthOf(1);
  });
});