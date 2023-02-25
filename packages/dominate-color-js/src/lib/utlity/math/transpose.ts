export function transpose(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const result: number[][] = [];
  for (let i = 0; i < columns; i++) {
    result[i] = [];
    for (let j = 0; j < rows; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
}
