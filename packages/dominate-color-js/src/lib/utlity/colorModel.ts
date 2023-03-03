import { RGBAColor } from "../colorDetection/colorDetection";

const toHex = (colors: RGBAColor[]) => {
  return colors.map(color => {
    return color.reduce((previousValue, currentValue, idx) => {
      if (idx === 3) {
        return (
          previousValue +
          parseInt((currentValue * 255).toString(), 10).toString(16)
        );
      } else {
        if (currentValue >= 10) {
          return (
            previousValue + parseInt(currentValue.toString(), 10).toString(16)
          );
        } else {
          return previousValue + `0${currentValue}`;
        }
      }
    }, "#");
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
