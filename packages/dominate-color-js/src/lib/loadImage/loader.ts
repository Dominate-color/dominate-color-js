import { getImageMatrix } from "../utlity";

function loader(
  src: string,
  AccessControlAllowOrigin?: RequestMode
): Promise<number[][]>;
function loader(ArrayBuffer: ArrayBuffer): Promise<number[][]>;
function loader(
  ArrayBufferOrSrc: string | ArrayBuffer,
  AccessControlAllowOrigin?: RequestMode
): Promise<number[][]> {
  if (typeof ArrayBufferOrSrc === "string") {
    return fetch(ArrayBufferOrSrc, { mode: AccessControlAllowOrigin })
      .then(respons => {
        if (respons.ok) {
          return respons.blob();
        }
        throw new Error(
          `the request returned the status code: ${respons.status}. Probably the problem is in CORS`
        );
      })
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        return getImageMatrix(imageBitmap);
      });
  }

  return new Promise((resolve, reject) => {
    console.log(ArrayBufferOrSrc);
    const blob = new Blob([ArrayBufferOrSrc], { type: "image/png" });
    if (blob) {
      resolve(blob);
    }
    reject("error decode image data");
  })
    .then(blob => {
      return createImageBitmap(blob as Blob);
    })
    .then(imageBitmap => {
      return getImageMatrix(imageBitmap);
    });
}

export { loader };
