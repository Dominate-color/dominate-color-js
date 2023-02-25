export function covarianceMatrix(data: number[][]) {
  const mean = data
    .reduce((mean, x) => {
      x.forEach((val, index) => {
        mean[index] = (mean[index] || 0) + val;
      });
      return mean;
    }, [])
    .map(val => val / data.length);

  const covariance = data.reduce((cov, x) => {
    x.forEach((val, index) => {
      if (!cov[index]) {
        cov[index] = Array(mean.length).fill(0);
      }
      x.forEach((val2, index2) => {
        if (!cov[index2]) {
          cov[index2] = Array(mean.length).fill(0);
        }
        cov[index][index2] += (val - mean[index]) * (val2 - mean[index2]);
      });
    });
    return cov;
  }, [] as number[][]);

  return covariance.map(row => row.map(val => val / (data.length - 1)));
}
