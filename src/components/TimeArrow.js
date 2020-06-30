import React from "react";

const TimeArrow = React.forwardRef((props, ref) => {
  const {type, angle, handleHover} = props;
  console.log('Render arrow', type);
  return (
    <div ref={ref} onMouseEnter={() => handleHover && handleHover(angle)} style={{transform: `rotate(${angle}deg)`}} className={`time-arrow-wrapper-${type}`}>
      <div className={`time-arrow-${type}`}/>
    </div>
  )
});

export default React.memo(TimeArrow);