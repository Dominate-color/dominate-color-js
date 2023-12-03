/**
 * Calculates the covariance matrix for the given data.
 *
 * @param data - The input data for which to calculate the covariance matrix.
 * @return The covariance matrix.
 */
export function covarianceMatrix(data: number[][]) {
  if (data.length === 0) {
    return data;
  }

  const mean = data[0].map((_, i) => data.reduce((sum, row) => sum + row[i], 0) / data.length);
  const covariance = data[0].map((_, indexI) => data[0].map((__, indexJ) => {
        const sum = data.reduce((accumulator, row) => {
            const diffProduct = (row[indexI] - mean[indexI]) * (row[indexJ] - mean[indexJ]);
            return accumulator + diffProduct;
        }, 0);
        return sum / (data.length - 1);
    }));
  return covariance;
}
