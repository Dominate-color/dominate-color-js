import type { RGBAColor } from '../types/index.js';

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
const NumberToHex = (number: number) => Math.round(number).toString(16).padStart(2, '0');

/**
 * Converts a color tuple to a hexadecimal string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The hexadecimal string representation of the color.
 */
const toHex = (color: RGBAColor) => color.reduce(
    // The last number in the color tuple represents the alpha (transparency) component.
    // It is expressed as a fraction of 1, so we scale it to 255 before converting to hexadecimal.
    (acc, cv, index) => acc + NumberToHex((index === color.length - 1) ? cv * 255 : cv),
    '#',
  );

/**
 * Converts a color tuple to an RGB string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The RGB string representation of the color.
 */
const toRGB = (color: RGBAColor) => `rgb(${color.slice(0, 3)})`;

/**
 * Converts a color tuple to an RGBA string representation.
 *
 * @param color - The color tuple to be converted.
 * @return The RGBA string representation of the color.
 */
const toRGBA = (color: RGBAColor) => `rgba(${color.join()})`;

export { toHex, toRGB, toRGBA };
