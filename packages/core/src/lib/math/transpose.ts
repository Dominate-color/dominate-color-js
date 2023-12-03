/**
 * Transposes a matrix.
 * @param matrix - The matrix to be transposed.
 * @return The transposed matrix.
 */
export function transpose(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const result = Array.from({ length: columns }, (_, i) => Array.from({ length: rows }, (__, j) => matrix[j][i]));
  return result;
}
