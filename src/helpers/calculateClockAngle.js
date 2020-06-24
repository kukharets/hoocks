export function calculateClockAngle(value, type) {
  let angle = 0;
  switch (type) {
    case "minutes":
    case "seconds": {
      angle = 360 * (value / 60)
    }
  }
  return angle;
}