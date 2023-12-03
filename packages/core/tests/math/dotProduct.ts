import { describe, expect, it } from 'vitest';
import { dotProduct } from '../../src/lib/math/index.js';

describe('dotProduct', () => {
    it('should calculate the correct dot product for two given matrices', () => {
      const matrixA = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const matrixB = [
        [7, 8],
        [9, 10],
        [11, 12],
      ];
      const expectedDotProduct = [
        [58, 64],
        [139, 154],
      ];
      expect(dotProduct(matrixA, matrixB)).toEqual(expectedDotProduct);
    });

    it('should error for mismatched matrix dimensions', () => {
      const matrixA = [[1, 2, 3]];
      const matrixB = [[1, 2]];
      expect(() => dotProduct(matrixA, matrixB)).toThrow(
        'The number of columns in matrix A must match the number of rows in matrix B',
      );
    });
  });
