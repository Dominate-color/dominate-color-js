import { describe, expect, it } from 'vitest';
import { invertMatrix } from '../../src/lib/math/index.js';

describe('invertMatrix', () => {
    it('should correctly invert a given matrix', () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const result = invertMatrix(matrix);
      expect(result[0][0]).toBeCloseTo(-2);
      expect(result[0][1]).toBeCloseTo(1);
      expect(result[1][0]).toBeCloseTo(1.5);
      expect(result[1][1]).toBeCloseTo(-0.5);
    });
  });
