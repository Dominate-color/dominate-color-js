export function euclideanDistance(coords1: number[], coords2: number[]) {
  return Math.hypot(...Object.keys(coords1).map((k) => coords2[parseInt(k, 10)] - coords1[parseInt(k, 10)]));
}
