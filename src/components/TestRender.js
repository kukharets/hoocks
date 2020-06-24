import React, {useEffect, useReducer, useRef} from 'react';

function TestRender() {
  console.error("RENDER")
  return (
    <div className='test-render'>Test</div>
  )
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(TestRender);