import { Bounds } from "../types";

export const isWithinBounds = (
  normalizedX: number,
  normalizedY: number,
  bounds: Bounds,
  tolerance: number = 0.03
): boolean => {
  const { x, y } = bounds;

  return normalizedX >= (x - tolerance) && normalizedX <= (x + tolerance) && normalizedY >= (y - tolerance) && normalizedY <= (y + tolerance)
};
