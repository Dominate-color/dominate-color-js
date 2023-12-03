import { describe, expect, it, vi } from 'vitest';
import { ImageData as ImageDataCanvas, Image as ImageBitmap } from 'canvas';
import { getImageMatrix, imageToMatrix } from '../../src/index.js';

describe('image-event', () => {
    const RGBA_LENGTH = 4;
    const IMAGE_SIZE = 3;
    const IMAGE_DATA = new Uint8ClampedArray(IMAGE_SIZE ** 2 * RGBA_LENGTH).fill(255);

    describe('imageToMatrix', () => {
        it('should convert ImageData to a matrix representation', () => {
          const imageData: ImageData = {
            width: 1,
            height: 1,
            data: new Uint8ClampedArray([
              255, 0, 0, 255,
              0, 255, 0, 255,
              0, 0, 255, 255,
            ]),
            colorSpace: 'srgb',
          };

         const expectedMatrix = [
            [255, 0, 0, 1],
            [0, 255, 0, 1],
            [0, 0, 255, 1],
          ];
          const matrix = imageToMatrix(imageData);
          expect(matrix).toEqual(expectedMatrix);
        });
      });

      describe('getImageMatrix', () => {
        it('getImageMatrix returns a matrix for an image', () => {
            const mockImageData = new ImageDataCanvas(IMAGE_DATA, IMAGE_SIZE, IMAGE_SIZE);

            const mockContext = {
              drawImage: vi.fn(),
              getImageData: vi.fn().mockReturnValue(mockImageData),
            };

            const mockCanvas = {
              getContext: vi.fn().mockReturnValue(mockContext),
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
            };

            // Mock image
            const mockImage: Partial<ImageBitmap> = {
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
            };

            /* Replace HTMLImageElement with ImageBitmap as
            it's easier to work with in Node.js environment */
            global.HTMLImageElement = ImageBitmap as any;

            // Mock OffscreenCanvas
            global.OffscreenCanvas = vi.fn().mockImplementation(() => mockCanvas) as any;

            const matrix = getImageMatrix(mockImage as any);

            expect(mockContext.drawImage).toHaveBeenCalledWith(mockImage, 0, 0);
            expect(mockContext.getImageData).toHaveBeenCalledWith(0, 0, mockImage.width, mockImage.height);
            expect(matrix).toBeInstanceOf(Array);

            expect(matrix.length).toBe(IMAGE_SIZE ** 2);
            expect(matrix[0].length).toBe(RGBA_LENGTH);
            expect(matrix).toEqual(new Array(IMAGE_SIZE ** 2).fill([255, 255, 255, 1]));
          });

        it('throws an error if the rendering context is lost', () => {
          const mockCanvas = {
            getContext: vi.fn().mockReturnValue(null),
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          };

           // Mock image
           const mockImage: Partial<ImageBitmap> = {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          };

          /* Replace HTMLImageElement with ImageBitmap as
          it's easier to work with in Node.js environment */
          global.HTMLImageElement = ImageBitmap as any;

          // Mock OffscreenCanvas
          global.OffscreenCanvas = vi.fn().mockImplementation(() => mockCanvas) as any;

          expect(() => getImageMatrix(mockImage as any)).toThrowError('context lost');
        });
      });
});
