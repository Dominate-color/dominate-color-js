export const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  if (ctx) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  throw Error("context lost");
};

export const getImageDataWithoutDomAccess = (imageBitmap: ImageBitmap) => {
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
  if (ctx) {
    ctx.drawImage(imageBitmap, 0, 0);
    return ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
  }

  throw new Error("context lost");
};

export const imageToMatrix = (imageData: ImageData) => {
  const matrix = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];

    matrix.push([r, g, b, a / 255]);
  }

  return matrix;
};

export const getImageMatrix = (image: HTMLImageElement | ImageBitmap) => {
  const imageData =
    image instanceof ImageBitmap
      ? getImageDataWithoutDomAccess(image)
      : getImageData(image);
  return imageToMatrix(imageData);
};
