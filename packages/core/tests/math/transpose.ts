import { describe, expect, it } from 'vitest';
import { transpose } from '../../src/lib/math/index.js';

describe('transpose', () => {
    it('should correctly transpose a given matrix', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const expectedTransposedMatrix = [
        [1, 4],
        [2, 5],
        [3, 6],
      ];
      expect(transpose(matrix)).toEqual(expectedTransposedMatrix);
    });
  });
