## Installation Core

```sh
npm install @dominate-color-js/core
```

```sh
yarn add @dominate-color-js/core
```

```sh
pnpm add @dominate-color-js/core
```

## Usage 

```js
import { colorDetection , toHex } from '@dominate-color-js/core'

// the path or array buffer of your image
const url = 'https://i.imgur.com/zgz4G0w_d.webp?maxwidth=760&fidelity=grand'

// we get an array of colors in the hex color space
const colors = colorDetection(url).then(toHex) 
```

## Installation Node.js

```sh
npm install @dominate-color-js/node
```

```sh
yarn add @dominate-color-js/node
```

```sh
pnpm add @dominate-color-js/node
```

[![react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/gallant-sanne-ii1e7o)


## Installation Vue

```sh
npm install @dominate-color-js/vue
```

```sh
yarn add @dominate-color-js/vue
```

```sh
pnpm add @dominate-color-js/vue
```

## Installation React

```sh
npm install @dominate-color-js/react
```

```sh
yarn add @dominate-color-js/react
```

```sh
pnpm add @dominate-color-js/react
```

> **Warning**
>  if you use vite, do not be lazy to add optimizeDeps to vite-config
> 
> ```js
>  optimizeDeps: {
>    exclude: ["@dominate-color-js/react"],
>  },
> ```
>  this will help to avoid incorrect operation in the vite collector in dev mode.

[![react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/cranky-gianmarco-0nepq2)


## Installation Solid.js

```sh
npm install @dominate-color-js/solid
```

```sh
yarn add @dominate-color-js/solid
```

```sh
pnpm add @dominate-color-js/solid
```
