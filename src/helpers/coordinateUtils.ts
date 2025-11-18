import { Bounds } from "../types";

export const isWithinBounds = (
  clickY: number,
  clickX: number,
  bounds: Bounds,
  tolerance: number = 0.02
): boolean => {
  const { x1, y1, x2, y2 } = bounds;

  return clickX >= (x1 - tolerance) && clickX <= (x2 + tolerance) && clickY >= (y1 - tolerance) && clickY <= (y2 + tolerance)
};
