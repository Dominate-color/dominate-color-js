import { describe, expect, it } from 'vitest';
import { computeEuclideanDistances, computeMahalanobisDistances, kMeansPP } from '../../src/index.js';

describe('computing', () => {
    describe('kMeansPP.ts', () => {
        describe('computeEuclideanDistances', () => {
            it('should correctly compute Evclidean distances', () => {
                const data = [[1, 2], [3, 4], [5, 6]];
                const centroids = [[1, 1], [2, 2]];

                const result = computeEuclideanDistances(data, centroids);

                expect(result.length).toBe(data.length);

                const expected = [
                    Math.sqrt((1 - 1) ** 2 + (2 - 1) ** 2),
                    Math.sqrt((3 - 2) ** 2 + (4 - 2) ** 2),
                    Math.sqrt((5 - 2) ** 2 + (6 - 2) ** 2),
                ];
                expect(result).toEqual(expected);
            });
        });

        describe('computeMahalanobisDistances', () => {
            it('should correctly compute Mahalanobis distances', () => {
              const data = [[1, 2], [3, 4], [5, 6]];
              const centroids = [[1, 1], [2, 2]];
              const cov = [[1, 0], [0, 1]];

              const result = computeMahalanobisDistances(data, centroids, cov);

              expect(result[0]).toBeCloseTo(1.4142135623730951, 0.005);
              expect(result[1]).toBeCloseTo(2.728427124746190, 0.005);
              expect(result[2]).toBeCloseTo(5.256854249492381, 0.005);
            });
          });

          describe('kMeansPP', () => {
            it('should correctly compute centroids using Euclidean distance', () => {
              const data = [[1, 2], [3, 4], [5, 6]];
              const k = 2;

              const centroids = kMeansPP(data, k, 'euclidean');

              expect(centroids.length).toEqual(k);

              centroids.forEach((centroid) => {
                expect(data).toContainEqual(centroid);
              });
            });

            it('should correctly compute centroids using Mahalanobis distance', () => {
              const data = [[255, 255, 255, 1], [255, 255, 255, 1], [255, 255, 255, 1], [255, 255, 255, 1]];
              const k = 2;
              const centroids = kMeansPP(data, k, 'mahalanobis');

              expect(centroids.length).toEqual(k);

              centroids.forEach((centroid) => {
                expect(data).toContainEqual(centroid);
              });
            });
          });
    });
});
