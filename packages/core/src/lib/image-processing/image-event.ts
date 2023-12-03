/**
 * Generates the image data from an ImageBitmap or HTMLImageElement without accessing the DOM.
 * @param imageBitmap - The ImageBitmap or HTMLImageElement to generate the image data from.
 * @return The generated image data.
 * @throws Thrown if the rendering context is lost.
 */
export const getImageDataWithoutDomAccess = (
  imageBitmap: ImageBitmap | HTMLImageElement,
) => {
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
  if (ctx) {
    ctx.drawImage(imageBitmap, 0, 0);
    return ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
  }

  throw new Error('context lost');
};

/**
 * Converts an ImageData object into a matrix representation.
 * @param imageData - The ImageData object to convert.
 * @return The matrix representation of the image data.
*/

export const imageToMatrix = (imageData: ImageData) => Array.from({ length: imageData.data.length / 4 }, (_, i) => {
    const r = imageData.data[i * 4];
    const g = imageData.data[i * 4 + 1];
    const b = imageData.data[i * 4 + 2];
    const a = imageData.data[i * 4 + 3];

    return [r, g, b, a / 255];
  });

/**
 * Generates a matrix representation of the given image.
 * @param image - The image to convert to a matrix.
 * @return The matrix representation of the image.
 */
export const getImageMatrix = (image: HTMLImageElement | ImageBitmap) => {
  const imageData = getImageDataWithoutDomAccess(image);
  return imageToMatrix(imageData);
};
