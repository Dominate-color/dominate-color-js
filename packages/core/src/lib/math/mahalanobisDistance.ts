import { dotProduct } from './dotProduct.js';
import { invertMatrix } from './invertMatrix.js';
import { transpose } from './transpose.js';

/**
 * Calculates the Mahalanobis distance between a point and a multivariate distribution.
 *
 * @param x - The coordinates of the point.
 * @param mean - The mean vector of the distribution.
 * @param cov - The covariance matrix of the distribution.
 * @return The Mahalanobis distance between the point and the distribution.
 */
export function mahalanobisDistance(
  x: number[],
  mean: number[],
  cov: number[][],
) {
  const delta = x.map((val, index) => [val - mean[index]]);
  const invertedCov = invertMatrix(cov);
  const deltaTransposed = transpose(delta);
  const product = dotProduct(deltaTransposed, invertedCov);
  const result = dotProduct(product, delta);
  return Math.sqrt(result[0][0]);
}
