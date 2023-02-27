import {
  kMeansPPeuclideanDistance,
  kMeansPPmahalanobisDistance,
  quality,
} from "@dominate-color-js/core";
import { getImageMatrix } from "./utlity";

async function colorDominate(filePath: string, quality: quality = "fast") {
  return getImageMatrix(filePath).then((colorData: number[][]) => {
    if (colorData && colorData.length !== 0) {
      switch (quality) {
        case "fast":
          return kMeansPPeuclideanDistance(colorData, 1);
        case "quality":
          return kMeansPPmahalanobisDistance(colorData, 1);
        default:
          return kMeansPPeuclideanDistance(colorData, 1);
      }
    }
    throw new Error("error: array image data empty");
  });
}

export { colorDominate };
