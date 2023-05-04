import { RGBAColor } from "../colorDetection/colorDetection";

/**  Formats the output array of RGBA colors into the HEX color space.
 * @example const HexColors = toHex(RGBAcolorsArray)
 * @param colors RGBA tuple of colors.
 */
const toHex = (colors: RGBAColor[]) => {
  return colors.map(
    color =>
      `#${color[0].toString(16).padStart(2, "0")}${color[1]
        .toString(16)
        .padStart(2, "0")}${color[2].toString(16).padStart(2, "0")}${color[3]
        .toString(16)
        .padStart(2, "0")}`
  );
};

/**  Formats the output array of RGBA colors into the RGB color space as a string.
 * @example const RGB = toRGB(RGBAcolorsArray)
 * @param colors RGBA tuple of colors.
 */
const toRGB = (colors: RGBAColor[]) =>
  colors.map(color => {
    return `rgb(${color.slice(0, 3)})`;
  });

/**  Formats the output array of RGBA colors into the RGBA color space as a string.
 * @example const RGBA = toRGBA(RGBAcolorsArray)
 * @param colors RGBA tuple of colors.
 */
const toRGBA = (colors: RGBAColor[]) =>
  colors.map(color => {
    return `rgba(${color.join()})`;
  });

export { toHex, toRGB, toRGBA };
