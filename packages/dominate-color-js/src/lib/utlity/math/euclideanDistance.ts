export function euclideanDistance(color1: number[], color2: number[]) {
  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];
  return Math.sqrt(r * r + g * g + b * b);
}
