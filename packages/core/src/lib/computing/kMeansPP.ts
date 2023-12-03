import { covarianceMatrix, mahalanobisDistance, euclideanDistance } from '../math/index.js';
import type { DistanceType, RGBAColor } from '../types/index.js';

/**
 * Calculates the Euclidean distances between each data point and the centroids.
 * @param data Array of data points.
 * @param centroids Number of centroids.
 * @return An array of the computed Euclidean distances.
 */
function computeEuclideanDistances(data: number[][], centroids: number[][]) {
  return data.map((x) => centroids.reduce((min, centroid) => {
      const d = euclideanDistance(x, centroid);
      return d < min ? d : min;
    }, Infinity));
}

/**
 * Computes the Mahalanobis distances between data points and centroids.
 * @param data Array of data points.
 * @param centroids Number of centroids.
 * @param covariance Covariance matrix.
 * @return Array of Mahalanobis distances.
 */
function computeMahalanobisDistances(data: number[][], centroids: number[][], cov: number[][]) {
  return data.map((x) => centroids.reduce((min, centroid) => {
      const d = mahalanobisDistance(x, centroid, cov);
      return d < min ? d : min;
    }, Infinity));
}

/**
 * Perform the k-means++ algorithm to find the centroids for clustering data.
 * @param data Array of data points.
 * @param k Number of centroids.
 * @return The centroids representing the clusters.
 */
function kMeansPP(
  data: number[][],
  k: number,
  distanceType: DistanceType,
) {
  const centroids: number[][] = [];
  let cov: number[][];

  const initialCentroidIndex = distanceType === 'mahalanobis' ? 0 : Math.floor(Math.random() * data.length);
  centroids.push(data[initialCentroidIndex]);

  if (distanceType === 'mahalanobis') {
    cov = covarianceMatrix(data);
  }

  const distancesFunction = distanceType === 'mahalanobis'
  ? (d: number[][], c: number[][]) => computeMahalanobisDistances(d, c, cov!)
  : computeEuclideanDistances;

  for (let i = centroids.length; i < k; i += 1) {
    const distances = distancesFunction(data, centroids);
    const sum = distances.reduce((a, b) => a + b);
    const probabilities = distances.map((d) => d / sum);

    let r = Math.random();
    let index = 0;
    while (r > 0) {
      r -= probabilities[index];
      index += 1;
    }
    index -= 1;

    centroids.push(data[index]);
  }

  return centroids as RGBAColor[];
}

export { computeEuclideanDistances, computeMahalanobisDistances, kMeansPP };
