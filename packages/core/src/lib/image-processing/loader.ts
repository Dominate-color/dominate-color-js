import type { ImageSource } from '../types/index.js';
import { getImageMatrix } from './image-event.js';

type OptionsLoader = {
   AccessControlAllowOrigin?: RequestMode,
};
/**
 * Converts a Blob into a matrix representation of an image.
 *
 * @param blob - The Blob object representing the image.
 * @return The matrix representation of the image.
 */
export const blobToMatrix = async (blob: Blob) => {
  const imageBitmap = await createImageBitmap(blob);
  return getImageMatrix(imageBitmap);
};

/**
 * Asynchronously loads a target, which can be a string or an ArrayBuffer,
 * and returns the result as a matrix using blobToMatrix function.
 *
 * @param target - The target to load, either a string URL
 * or an ArrayBuffer containing the image data.
 * @param options - The options for loading the target.
 * @throws Throws an error if the image is not found.
 * @return A Promise that resolves to the matrix representation
 * of the loaded image.
 */
async function loader<T extends ImageSource>(
  target: T,
  options: (T extends string ? OptionsLoader : {}) = {},
) {
  const { AccessControlAllowOrigin } = options as OptionsLoader;

  if (typeof target === 'string') {
    const response = await fetch(target, { mode: AccessControlAllowOrigin });
    if (!response.ok) {
      throw new Error('image not found');
    }
      const result = await blobToMatrix(await response.blob());
      return result;
  }

  const result = await blobToMatrix(new Blob([target], { type: 'image/png' }));
  return result;
}

export { loader };
