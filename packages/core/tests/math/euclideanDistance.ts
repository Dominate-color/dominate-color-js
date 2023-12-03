import { describe, expect, it } from 'vitest';
import { euclideanDistance } from '../../src/lib/math/index.js';

describe('euclideanDistance', () => {
    it('should calculate the correct Euclidean distance for two given coordinate arrays', () => {
      const coords1 = [1, 2, 3];
      const coords2 = [4, 5, 6];
      const knownResult = 5.196152422706632; // Известный результат
      expect(euclideanDistance(coords1, coords2)).toEqual(knownResult);
    });
});
