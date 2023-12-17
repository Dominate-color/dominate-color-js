[code-badge]: https://img.shields.io/badge/source-black?logo=github

### `@dominate-color.js/core`

[core-npm-badge]: https://img.shields.io/npm/v/@dominate-color.js/core?logo=npm

[![core-npm-badge]](https://npmjs.com/package/@dominate-color.js/core)
![Size](https://img.shields.io/bundlephobia/minzip/@dominate-color.js/core)
[![code-badge]](https://github.com/Dominate-color/dominate-color-js/tree/master/packages/core)

A robust TypeScript library for color detection in images. The `@dominate-color.js/core` package provides essential functionality to identify and extract dominant colors from an image source. The library is built to cater to various use cases, from creating color-based aesthetic layouts to implementing dynamic theming based on image colors in your applications.

#### `colorDetection()`

The `colorDetection` function is a cornerstone of the `@dominate-color.js/core` package, enabling developers to easily detect colors in an image. It accepts an image source and optional configuration parameters, returning a promise that resolves with an array of the most dominant RGBA colors found in the image.

##### Features

- Supports various image sources, including URLs, file paths, and buffers.
- Offers configurable settings to fine-tune color detection.
- Utilizes efficient algorithms for fast and accurate color extraction.

##### Getting Started

Before integrating `colorDetection` into your project, it is advisable to go through the provided documentation to understand how to use the function effectively. This function is designed to be straightforward and flexible, allowing for easy adaptation to your specific needs.

##### Installation

First, install the `@dominate-color.js/core` package using npm, pnpm or yarn:

```bash
npm install @dominate-color.js/core
# or
yarn add @dominate-color.js/core
```

##### Usage

To use colorDetection() in your project, follow these steps:

1. Import the colorDetection function from the package:
```typescript 
import { colorDetection } from '@dominate-color.js/core';
```
2. Prepare your image source. This can be a URL, a local file path, or an ArrayBuffer.
3. (Optional) Set up your configuration options. You can specify the distance method, the number k of colors to detect, and AccessControlAllowOrigin for CORS settings.
4. Call colorDetection() with your image source and optional configuration:
```typescript
    import { colorDetection, type Config } from '@dominate-color.js/core';
     
    const config: Config = {
        distance: 'euclidean', // Choose the 'euclidean' algorithm for color distance calculation
        k: 5, // Detect the top 5 dominant colors
        AccessControlAllowOrigin: '*' // Useful for CORS when fetching images from external URLs
    };

    // Replace `source.url` with the path to your image or any other type supported by the `colorDetection` function when calling it.
    colorDetection(source.url, config)
        .then(colors => {
            console.log('Detected Colors with custom config:', colors);
            updateUIWithColors(colors);
        })
        .catch(error => {
            console.error('Error detecting colors with custom config:', error);
            warnUserSomethingWentWrong(error)
        });
```