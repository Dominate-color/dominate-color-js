export function multiplyMatrixVector(
  matrix: number[][],
  vector: number[],
): number[] {
  return matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
}
