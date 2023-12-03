export function dotProduct(matrixA: number[][], matrixB: number[][]) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    throw new Error(
      'The number of columns in matrix A must match the number of rows in matrix B',
    );
  }

  const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i += 1) {
    for (let j = 0; j < colsB; j += 1) {
      result[i][j] = matrixA[i].reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0);
    }
  }

  return result;
}
