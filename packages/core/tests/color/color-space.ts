import { describe, expect, it } from 'vitest';
import type { RGBAColor } from '../../src/index.js';
import { toHex, toRGB, toRGBA } from '../../src/index.js';

describe('color', () => {
    describe('color-space', () => {
        const white: RGBAColor = [255, 255, 255, 1];
        const black: RGBAColor = [0, 0, 0, 1];

        it('should correctly convert colors', () => {
            expect(toHex(white)).toEqual('#ffffffff');
            expect(toHex(black)).toEqual('#000000ff');

            expect(toRGB(white)).toEqual('rgb(255,255,255)');
            expect(toRGB(black)).toEqual('rgb(0,0,0)');

            expect(toRGBA(white)).toEqual('rgba(255,255,255,1)');
            expect(toRGBA(black)).toEqual('rgba(0,0,0,1)');
        });
    });
});
