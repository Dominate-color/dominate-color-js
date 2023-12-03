import { describe, expect, it } from 'vitest';
import { multiplyMatrixVector } from '../../src/lib/math/index.js';

describe('multiplyMatrixVector', () => {
    it('should correctly multiply a matrix by a vector', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const vector = [2, 3, 4];
      const expectedResult = [20, 47];
      expect(multiplyMatrixVector(matrix, vector)).toEqual(expectedResult);
    });
  });
