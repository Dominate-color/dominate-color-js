import { RGBAColor } from "../colorDetection/colorDetection";

type colorModel = "hex" | "rgba" | "rgb";

function toGetColorArray(model: colorModel = "rgba") {
  return (colors: RGBAColor[]) => {
    if (model === "hex") {
      return colors.map(color => {
        return `#${parseInt(color[0].toString(), 10).toString(16)}${parseInt(
          color[1].toString(),
          10
        ).toString(16)}${parseInt(color[2].toString(), 10).toString(16)}`;
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
