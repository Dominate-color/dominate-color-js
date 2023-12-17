/**
 * Quality the level of detail or speed of processing.
 * 'fast' implies quicker processing with less detail.
 * 'quality' implies slower processing with more detail.
 */
type Quality = 'fast' | 'quality';
/**
 * Enumerates the types of distance calculations that can be used.
 * 'mahalanobis': Utilizes the Mahalanobis distance for calculations.
 * 'euclidean': Utilizes the Euclidean distance for calculations.
 */
type DistanceType = 'mahalanobis' | 'euclidean';

/**
 * It is a tuple of three numbers, each representing the red, green, and blue
 * components of the color respectively.
 */
type RGBColor = [number, number, number];

/**
 * It is a tuple of four numbers, each representing the red, green, blue,
 * and alpha (transparency) components of the color respectively.
 */
type RGBAColor = [number, number, number, number];

/**
 * It can be a string URL/path or an ArrayBuffer containing the image data.
 */
type ImageSource = string | ArrayBuffer;
interface Config {
  /**
   * A simplified type that will indicate
   * on the basis of which we will calculate
   * the resulting data
   */
  distance: Quality;
  /**
   * The number of clusters or simply put
   * the number of colors that will be returned
  */
  k?: number;
  /**
   * Setting up cors in case you are
   * trying to upload an image for by url
   */
  AccessControlAllowOrigin?: RequestMode;
}

export type { RGBAColor, RGBColor, ImageSource, Config, Quality, DistanceType };
