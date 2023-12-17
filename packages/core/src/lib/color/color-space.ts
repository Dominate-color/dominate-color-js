import type { RGBAColor, RGBColor } from '../types/index.js';

/**
 * Converts a numeric value to a two-character hexadecimal string.
 *
 * The number is first rounded and then converted to a hexadecimal string.
 * If the resulting string is a single character, it is padded with a leading zero
 * to ensure a two-character output.
 *
 * @param number - The number to be converted to a hexadecimal string.
 * @return A two-character hexadecimal string representation of the number.
 */
const NumberToHex = (number: number) => Math.max(0, Math.round(number)).toString(16).padStart(2, '0');

/**
 * Converts an RGBA color to an RGB color by blending it over a background color.
 *
 * The RGBA color is combined with the specified background color, taking into account the alpha
 * value of the RGBA color. If no background color is provided, white is used by default.
 *
 * @param rgbaColor - The RGBA color to be converted.
 * @param backgroundColor - The background color to blend with, defaulting to white.
 * @return The resulting RGB color after blending.
 */
function rgbaToRgb(rgbaColor: RGBAColor, backgroundColor: RGBColor = [255, 255, 255]): RGBColor {
  const [r, g, b, alpha] = rgbaColor;
  const [br, bg, bb] = backgroundColor;

  // Calculate the new red, green, and blue values by blending the foreground color
  // with the background color based on the alpha of the foreground color.
  const newR = Math.round(br * (1 - alpha) + r * alpha);
  const newG = Math.round(bg * (1 - alpha) + g * alpha);
  const newB = Math.round(bb * (1 - alpha) + b * alpha);

  // Return the new RGB color after blending.
  return [newR, newG, newB];
}

/**
 * Converts a color tuple to a hexadecimal string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The hexadecimal string representation of the color.
 */
const toHex = (color: RGBAColor): string => color.reduce((acc, cv, index) => {
    // If the last number is 1, do not append 'ff' to the accumulator.
    if (index === color.length - 1 && cv === 1) {
      return acc;
    }
    // Scale alpha to 255 and convert to hex, otherwise just convert to hex.
    const value = index === color.length - 1 ? Math.round(cv * 255) : cv;
    return acc + NumberToHex(value);
  }, '#');
/**
 * Converts a color tuple to an RGB string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The RGB string representation of the color.
 */
const toRGB = (color: RGBAColor) => `rgb(${rgbaToRgb(color)})`;

/**
 * Converts a color tuple to an RGBA string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The RGBA string representation of the color.
 */
const toRGBA = (color: RGBAColor) => `rgba(${color})`;

export { toHex, toRGB, toRGBA, NumberToHex, rgbaToRgb };
