import { dotProduct } from "./dotProduct";
import { invertMatrix } from "./invertMatrix";
import { transpose } from "./transpose";

export function mahalanobisDistance(
  x: number[],
  mean: number[],
  cov: number[][]
) {
  const delta = x.map((val, index) => [val - mean[index]]);
  const invertedCov = invertMatrix(cov);
  const deltaTransposed = transpose(delta);
  const product = dotProduct(deltaTransposed, invertedCov);
  const result = dotProduct(product, delta);
  return Math.sqrt(result[0][0]);
}
