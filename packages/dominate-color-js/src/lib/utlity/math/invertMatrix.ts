export function invertMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  const identityMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    identityMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      identityMatrix[i][j] = i === j ? 1 : 0;
    }
  }

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = j;
      }
    }

    const temp = matrix[i];
    matrix[i] = matrix[maxRow];
    matrix[maxRow] = temp;

    const tempIdentity = identityMatrix[i];
    identityMatrix[i] = identityMatrix[maxRow];
    identityMatrix[maxRow] = tempIdentity;

    const divisor = matrix[i][i];
    for (let j = 0; j < n; j++) {
      matrix[i][j] /= divisor;
      identityMatrix[i][j] /= divisor;
    }

    for (let j = 0; j < n; j++) {
      if (j !== i) {
        const factor = matrix[j][i];
        for (let k = 0; k < n; k++) {
          matrix[j][k] -= matrix[i][k] * factor;
          identityMatrix[j][k] -= identityMatrix[i][k] * factor;
        }
      }
    }
  }

  return identityMatrix;
}
