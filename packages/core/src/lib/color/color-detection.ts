import { FILE_PATH_PATTERN, URL_PATTERN } from '../const/index.js';
import { loader } from '../image-processing/index.js';
import { kMeansPP } from '../computing/index.js';

import type { Config, ImageSource, Quality } from '../types/index.js';

/**
 * Processes the given color data using the specified distance metric and clustering algorithm.
 *
 * @param colorData - The color data to be processed.
 * @param distance - The distance metric to be used for clustering.
 * @param k - The number of clusters.
 * @throws Throws an error if the color data is empty.
 * @return The result of the clustering algorithm.
 */
const processColorData = (colorData: number[][], distance: Quality, k: number) => {
    if (!colorData || colorData.length === 0) {
      throw new Error('color data is empty');
    }

    switch (distance) {
        case 'fast':
          return kMeansPP(colorData, k, 'euclidean');
        case 'quality':
          return kMeansPP(colorData, k, 'mahalanobis');
        default:
          return kMeansPP(colorData, k, 'euclidean');
      }
  };

/**
 * Performs color detection on an image source.
 *
 * @param src - The source of the image.
 * @param [config] - The configuration options for the color detection.
 * @return A promise that resolves to an array of RGBA colors
 * representing the detected colors.
 */
async function colorDetection<T extends ImageSource>(
  src: T,
  config: Config = {} as Config,
) {
  const { distance = 'fast', k = 1, AccessControlAllowOrigin } = config;

  if (k < 1) {
    throw new Error('k must be greater than 0');
  }

  if (typeof src === 'string' && src.length === 0) {
    throw new Error("Guess you've passed an empty string.");
  }
  if (typeof src === 'string' && !URL_PATTERN.test(src) && !FILE_PATH_PATTERN.test(src)) {
    throw new Error('Invalid string format. Expected an image URL or file path.');
  }
  if (src instanceof ArrayBuffer && src.byteLength === 0) {
    throw new Error('The buffer that was passed was empty.');
  }

  const detectedColors = await loader(src, { AccessControlAllowOrigin });
  return processColorData(detectedColors, distance, k);
}

export { colorDetection };
