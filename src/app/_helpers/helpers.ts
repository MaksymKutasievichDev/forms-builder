import {rgbColorInterface} from "../form-builder/interfaces/color.interface";

export const hexToRgb = (hex: string | undefined): rgbColorInterface | null => {
  if (typeof hex === "string") {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  return null;
}
