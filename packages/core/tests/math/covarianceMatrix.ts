import { describe, expect, it } from 'vitest';
import { covarianceMatrix } from '../../src/lib/math/index.js';

describe('covarianceMatrix', () => {
    it('should calculate the correct covariance matrix for a given data set', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expectedCovarianceMatrix = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9],
      ];
      expect(covarianceMatrix(data)).toEqual(expectedCovarianceMatrix);
    });

    it('should return an empty matrix for an empty data set', () => {
        expect(covarianceMatrix([])).toEqual([]);
    });
  });
