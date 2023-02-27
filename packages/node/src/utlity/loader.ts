const { createCanvas, loadImage } = require("canvas");

export async function getImageMatrix(filepath: string) {
  const image = await loadImage(filepath);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, image.width, image.height).data;
  const matrix: number[][] = [];

  for (let y = 0; y < image.height; y++) {
    matrix[y] = [];
    for (let x = 0; x < image.width; x++) {
      const index = (y * image.width + x) * 4;
      matrix[y] = [
        imageData[index],
        imageData[index + 1],
        imageData[index + 2],
        imageData[index + 3] / 255,
      ];
    }
  }

  return matrix;
}
