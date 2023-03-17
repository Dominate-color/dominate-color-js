import { RGBAColor } from "../colorDetection/colorDetection";

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

const toRGB = (colors: RGBAColor[]) =>
  colors.map(color => {
    return `rgb(${color.slice(0, 3)})`;
  });
const toRGBA = (colors: RGBAColor[]) =>
  colors.map(color => {
    return `rgba(${color.join()})`;
  });

export { toHex, toRGB, toRGBA };
