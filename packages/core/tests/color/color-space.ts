import { describe, expect, it } from 'vitest';
import type { RGBAColor } from '../../src/index.js';
import { NumberToHex, rgbaToRgb, toHex, toRGB, toRGBA } from '../../src/index.js';

describe('color', () => {
    describe('color utils functions', () => {
        describe('rgbaToRgb', () => {
            it('converts rgba to rgb with default white background', () => {
              expect(rgbaToRgb([100, 150, 200, 0.5])).toEqual([178, 203, 228]);
            });

            it('converts rgba to rgb with a custom background color', () => {
              expect(rgbaToRgb([100, 150, 200, 0.5], [50, 50, 50])).toEqual([75, 100, 125]);
            });

            it('returns the rgb color unchanged when alpha is 1', () => {
              expect(rgbaToRgb([100, 150, 200, 1])).toEqual([100, 150, 200]);
            });

            it('returns the background color when alpha is 0', () => {
              expect(rgbaToRgb([100, 150, 200, 0], [50, 50, 50])).toEqual([50, 50, 50]);
            });
          });

        describe('NumberToHex', () => {
            it('converts a single-digit number to hex with padding', () => {
              expect(NumberToHex(5)).toBe('05');
            });

            it('converts a number less than 16 to hex with padding', () => {
              expect(NumberToHex(15)).toBe('0f');
            });

            it('converts a two-digit number to hex without padding', () => {
              expect(NumberToHex(16)).toBe('10');
            });

            it('rounds and converts a floating-point number to hex', () => {
              expect(NumberToHex(15.5)).toBe('10');
            });

            it('handles the maximum color value correctly', () => {
              expect(NumberToHex(255)).toBe('ff');
            });

            it('handles negative numbers by rounding up', () => {
              expect(NumberToHex(-0.9)).toBe('00');
            });
        });
    });

    describe('color convert functions', () => {
        const white: RGBAColor = [255, 255, 255, 1];
        const black: RGBAColor = [0, 0, 0, 1];

        const semiTransparentRed: RGBAColor = [255, 0, 0, 0.5];
        const red75percent: RGBAColor = [255, 0, 0, 0.75];

        const transparent: RGBAColor = [0, 0, 0, 0];

        describe('toHex function', () => {
            it('should convert white color to #ffffff', () => {
              expect(toHex(white)).toEqual('#ffffff');
            });

            it('should convert black color to #000000', () => {
              expect(toHex(black)).toEqual('#000000');
            });

            it('should handle semi-transparent colors', () => {
              expect(toHex(semiTransparentRed)).toEqual('#ff000080');
            });

            it('should handle fully transparent colors', () => {
              expect(toHex(transparent)).toEqual('#00000000');
            });

            it('should handle colors with alpha value other than 1', () => {
              expect(toHex(red75percent)).toEqual('#ff0000bf');
            });
          });

          describe('toRGBA function', () => {
            it('should convert white color to #ffffff', () => {
              expect(toRGBA(white)).toEqual('rgba(255,255,255,1)');
            });

            it('should convert black color to #000000', () => {
              expect(toRGBA(black)).toEqual('rgba(0,0,0,1)');
            });

            it('should handle semi-transparent colors', () => {
              expect(toRGBA(semiTransparentRed)).toEqual('rgba(255,0,0,0.5)');
            });

            it('should handle fully transparent colors', () => {
              expect(toRGBA(transparent)).toEqual('rgba(0,0,0,0)');
            });

            it('should handle colors with alpha value other than 1', () => {
              expect(toRGBA(red75percent)).toEqual('rgba(255,0,0,0.75)');
            });
          });

        /** The `toRGB` function is designed to return the RGB representation of a color.
        * When provided with a `transparent` color, the function returns the RGB values
        for `white`, which is the `default` background color used when blending transparent colors. */
          describe('toRGBA function', () => {
            it('should convert white color to #ffffff', () => {
              expect(toRGB(white)).toEqual('rgb(255,255,255)');
            });

            it('should convert black color to #000000', () => {
              expect(toRGB(black)).toEqual('rgb(0,0,0)');
            });

            it('should handle semi-transparent colors', () => {
              expect(toRGB(semiTransparentRed)).toEqual('rgb(255,128,128)');
            });

            it('should handle fully transparent colors', () => {
                expect(toRGB(transparent)).toEqual('rgb(255,255,255)');
            });

            it('should handle colors with alpha value other than 1', () => {
              expect(toRGB(red75percent)).toEqual('rgb(255,64,64)');
            });
          });
    });
});
