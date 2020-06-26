import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';

export default function useTimes() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { seconds, angle, minutes } = state;

  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and new value to compare function
  const isEqual = compare(previous, value);

  // If not equal update previous to new value (for next render)
  // and then return new new value below.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = value;
    }
  });

  return isEqual ? previous : value;
}