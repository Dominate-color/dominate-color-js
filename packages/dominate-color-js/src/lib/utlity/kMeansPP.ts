import {
  covarianceMatrix,
  mahalanobisDistance,
  euclideanDistance,
} from "./math";

// Define the k-means++ function
export function kMeansPPeuclideanDistance(colors: number[][], k: number) {
  // Initialize an empty array for the cluster centroids
  const centroids: number[][] = [];

  // Randomly select the first centroid
  const randomIndex = Math.floor(Math.random() * colors.length);
  centroids.push(colors[randomIndex]);

  // Loop k - 1 times to select the remaining centroids
  for (let i = 1; i < k; i++) {
    // Initialize an array to store the minimum distance from each color to the closest centroid
    const distances = new Array(colors.length).fill(Number.POSITIVE_INFINITY);
    colors.forEach((color, index) => {
      let minDistance = Number.POSITIVE_INFINITY;
      centroids.forEach(centroid => {
        const distance = euclideanDistance(color, centroid);
        if (distance < minDistance) {
          minDistance = distance;
        }
      });
      distances[index] = minDistance;
    });

    // Normalize the distances to get a probability distribution
    const totalDistance = distances.reduce(
      (sum, distance) => sum + distance,
      0
    );
    const probabilities = distances.map(distance => distance / totalDistance);

    // Select the next centroid based on the probabilities
    let random = Math.random();
    for (let j = 0; j < probabilities.length; j++) {
      random -= probabilities[j];
      if (random <= 0) {
        centroids.push(colors[j]);
        break;
      }
    }
  }

  return centroids;
}

export function kMeansPPmahalanobisDistance(
  data: number[][],
  k: number,
  distanceFn = mahalanobisDistance
) {
  const means: number[][] = [];
  const cov = covarianceMatrix(data);

  // Initialize means with first data point
  means.push(data[0]);

  for (let i = 1; i < k; i++) {
    const distances = data.map(x =>
      means.reduce((min, mean) => {
        const d = distanceFn(x, mean, cov);
        return d < min ? d : min;
      }, Infinity)
    );

    const sum = distances.reduce((a, b) => a + b);
    const probabilities = distances.map(d => d / sum);

    let r = Math.random();
    let index = 0;
    while (r > 0) {
      r -= probabilities[index];
      index++;
    }
    index--;

    means.push(data[index]);
  }

  return means;
}
