export function subtractVectors(a: number[], b: number[]): number[] {
  return a.map((value, index) => value - b[index]);
}
