import { describe, expect, it } from 'vitest';
import { mahalanobisDistance } from '../../src/lib/math/index.js';

describe('mahalanobisDistance', () => {
    it('should correctly calculate the Mahalanobis distance', () => {
      const x = [2, 2];
      const mean = [1, 1];
      const cov = [
        [1, 0],
        [0, 1],
      ];
      const expectedDistance = Math.sqrt(2);
      expect(mahalanobisDistance(x, mean, cov)).toBeCloseTo(expectedDistance);
    });
  });
