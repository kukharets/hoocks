import React from "react";

export default function TimeArrow({wrapperClass, arrowClass, angle, handleHover}) {
  console.log("RENDER MINUTES ARROW")
  return (
    <div onMouseEnter={() => handleHover && handleHover()} style={{transform: `rotate(${angle}deg)`}} className={wrapperClass}>
      <div className={arrowClass}/>
    </div>
  )
}