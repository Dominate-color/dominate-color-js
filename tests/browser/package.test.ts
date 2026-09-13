import { expect, test } from '@playwright/test';

test('built ESM package exposes the public helpers', async ({ page }) => {
  await page.goto('/tests/browser/');
  const result = await page.evaluate(async () => {
    const moduleURL = new URL('/packages/core/dist/index.js', location.href).href;
    const core = (await import(moduleURL)) as typeof import('../../packages/core/src/index.js');
    return { hex: core.toHex([255, 0, 0, 1]), detection: typeof core.colorDetection };
  });
  expect(result).toEqual({ hex: '#ff0000', detection: 'function' });
});

test('built ESM package decodes an image with real browser APIs', async ({ page }) => {
  await page.goto('/tests/browser/');
  const hasImageAPIs = await page.evaluate(
    () => typeof OffscreenCanvas !== 'undefined' && typeof createImageBitmap !== 'undefined',
  );
  test.skip(
    !hasImageAPIs,
    'This browser build lacks the image APIs required by the existing library.',
  );
  const result = await page.evaluate(async () => {
    // Resolve against this fixture's URL, as a consuming web application would.
    const moduleURL = new URL('/packages/core/dist/index.js', location.href).href;
    const { colorDetection, toHex } = (await import(
      moduleURL
    )) as typeof import('../../packages/core/src/index.js');
    const canvas = new OffscreenCanvas(2, 2);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context unavailable');
    context.fillStyle = '#ff0000';
    context.fillRect(0, 0, 2, 2);
    const bytes = await (await canvas.convertToBlob({ type: 'image/png' })).arrayBuffer();
    const colors = await colorDetection(bytes, { distance: 'fast', k: 1 });
    return { colors, hex: toHex(colors[0]) };
  });
  expect(result).toEqual({ colors: [[255, 0, 0, 1]], hex: '#ff0000' });
});
