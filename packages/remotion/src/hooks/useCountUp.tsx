import { interpolate, spring, useCurrentFrame } from "remotion";
import { DEFAULT_FPS } from "../constants";

const TIMER_TIME = 3 * DEFAULT_FPS;

export const useCountUp = (
  to: number,
  from = 0,
  timeInFrame: number = TIMER_TIME
): number => {
  const frame = useCurrentFrame();

  const spr = spring({
    frame,
    fps: DEFAULT_FPS,
    durationInFrames: timeInFrame,
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  const value = interpolate(spr, [0, 1], [from, to]);

  const roundedValue = Math.round(value);

  return roundedValue;
};
