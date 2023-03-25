import { RGBAColor } from "../colorDetection/colorDetection";

/**  Formats the output array of RGBA colors into the HEX color space.
 * @example const HexColors = toHex(RGBAcolorsArray)
 * @param colors RGBA tuple of colors.
 */
const toHex = (colors: RGBAColor[]) => {
  return colors.map(color => {
    return (
      "#" +
      color
        .reduce((previousValue, currentValue, idx) => {
          if (idx === 3) {
            return [
              ...previousValue,
              Math.round(currentValue * 255).toString(16),
            ];
          } else {
            const hexValue = currentValue.toString(16).padStart(2, "0");
            return [...previousValue, hexValue];
          }
        }, [] as string[])
        .join("")
    );
  });
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
