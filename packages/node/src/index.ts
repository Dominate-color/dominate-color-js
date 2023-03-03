import {
  kMeansPPeuclideanDistance,
  kMeansPPmahalanobisDistance,
  quality,
} from "@dominate-color-js/core";

function colorDominate(colorData: number[][]): number[][];
function colorDominate(colorData: number[][], quality?: "quality"): number[][];
function colorDominate(
  colorData: number[][],
  quality?: "fast",
  k?: number
): number[][];
function colorDominate(
  colorData: number[][],
  quality: quality = "fast",
  k = 1
): number[][] {
  if (colorData && colorData.length !== 0) {
    switch (quality) {
      case "quality":
        return kMeansPPmahalanobisDistance(colorData, 1);
      default:
        return kMeansPPeuclideanDistance(colorData, k);
    }
  }
  throw new Error("error: array image data empty");
}

export { colorDominate };
