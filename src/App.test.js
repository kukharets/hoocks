import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useTimer from "./customHooks/useTimer";
describe('useTimer hook test', () => {
  it('should start with initial state values', () => {
    const { result  }= renderHook(() => useTimer());
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
