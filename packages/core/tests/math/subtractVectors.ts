import { describe, expect, it } from 'vitest';
import { subtractVectors } from '../../src/lib/math/index.js';

describe('subtractVectors', () => {
  it('should correctly subtract one vector from another', () => {
    const vectorA = [5, 6, 7];
    const vectorB = [2, 3, 4];
    const expectedResult = [3, 3, 3];
    expect(subtractVectors(vectorA, vectorB)).toEqual(expectedResult);
  });
});
