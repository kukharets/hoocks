import React, { useEffect, useMemo, useReducer, useRef, useState} from 'react';

export default function useFirstMountSkip() {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);
  return didMount;
}