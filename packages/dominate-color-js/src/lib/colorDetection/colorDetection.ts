import { loader } from "../loadImage/loader";
import {
  kMeansPPeuclideanDistance,
  kMeansPPmahalanobisDistance,
} from "../utlity";

type quality = "fast" | "quality";

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type RGBUnit = IntRange<0, 256>;

type RGBAColor = [RGBUnit, RGBUnit, RGBUnit, number];

const urlRegExp = new RegExp("^(http|https)://.*$"),
  filePathRegExp = new RegExp("^(/|\\\\|\\.|\\.\\.)");

/**  Takes the path to an image and returns an array of colors in the RGBA format.
 * @example const colors = await colorDetection(url)
 * @param src Path to an image.
 * @param k The number of colors returned is limited to a maximum of one if the distance in the quality format is used(P.S the number of colors in the fast format).
 * @param distance The parameter affecting the quality of the final result is set to "fast" by default. To explicitly specify or change the quality, you can pass the string literal "fast" or "quality". Note that the speed of image processing will vary accordingly.
 * @param AccessControlAllowOrigin Access-Control-Allow-Origin is an HTTP header that specifies which origins (domains) are permitted to access resources on a server. To allow requests from any origin, you can set the header value to "*" by specifying a boolean value of true.
 */
function colorDetection(ArrayBuffer: ArrayBuffer): Promise<RGBAColor[]>;
function colorDetection(
  ArrayBuffer: ArrayBuffer,
  distance: "quality"
): Promise<RGBAColor[]>;
function colorDetection(
  ArrayBuffer: ArrayBuffer,
  distance: "fast",
  k?: number
): Promise<RGBAColor[]>;
function colorDetection(src: string): Promise<RGBAColor[]>;
function colorDetection(
  src: string,
  distance: "quality",
  AccessControlAllowOrigin?: RequestMode
): Promise<RGBAColor[]>;
function colorDetection(
  src: string,
  distance: "fast",
  k?: number,
  AccessControlAllowOrigin?: RequestMode
): Promise<RGBAColor[]>;
function colorDetection(
  srcOrArrayBuffer: string | ArrayBuffer,
  distance: quality = "fast",
  kOrAccessControlAllowOrigin?: number | RequestMode,
  AccessControlAllowOrigin?: RequestMode
): Promise<RGBAColor[]> {
  const quantityColor =
    typeof kOrAccessControlAllowOrigin === "number"
      ? kOrAccessControlAllowOrigin
      : 1;

  const CORS =
    typeof kOrAccessControlAllowOrigin === "number"
      ? AccessControlAllowOrigin
      : kOrAccessControlAllowOrigin;

  if (typeof srcOrArrayBuffer === "string" && srcOrArrayBuffer.length === 0) {
    throw new Error("Guess you've passed an empty string.");
  }
  if (
    typeof srcOrArrayBuffer === "string" &&
    (urlRegExp.test(srcOrArrayBuffer) ||
      filePathRegExp.test(srcOrArrayBuffer)) === false
  ) {
    throw new Error(
      "The string that you pass to the arguments of the function does not match the pattern of the image link or the path to the image."
    );
  }
  if (
    srcOrArrayBuffer instanceof ArrayBuffer &&
    srcOrArrayBuffer.byteLength === 0
  ) {
    throw new Error("The buffer that was passed was empty.");
  }

  const callback = (colorData: number[][]) => {
    if (colorData && colorData.length !== 0) {
      switch (distance) {
        case "fast":
          return kMeansPPeuclideanDistance(colorData, quantityColor);
        case "quality":
          return kMeansPPmahalanobisDistance(colorData, quantityColor);
        default:
          return kMeansPPeuclideanDistance(colorData, quantityColor);
      }
    }
    throw new Error("error: array image data empty");
  };

  if (typeof srcOrArrayBuffer === "string") {
    return loader(srcOrArrayBuffer, CORS).then(callback) as Promise<
      Array<RGBAColor>
    >;
  }

  return loader(srcOrArrayBuffer).then(callback) as Promise<Array<RGBAColor>>;
}

export { colorDetection, RGBAColor, RGBUnit, IntRange, Enumerate, quality };
