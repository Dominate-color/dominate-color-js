import { RGBAColor } from "../colorDetection/colorDetection";

type colorModel = "hex" | "rgba" | "rgb";

function toGetColorArray(model: colorModel = "rgba") {
  return (colors: RGBAColor[]) => {
    if (model === "hex") {
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
                previousValue +
                parseInt(currentValue.toString(), 10).toString(16)
              );
            } else {
              return previousValue + `0${currentValue}`;
            }
          }
        }, "#");
      });
    } else if (model === "rgb") {
      return colors.map(color => {
        return `rgb(${color.slice(0, 3)})`;
      });
    } else {
      return colors.map(color => {
        return `rgba(${color.join()})`;
      });
    }
  };
}

export { toGetColorArray, colorModel };
