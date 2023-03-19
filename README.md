## Installation
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

#### [`dominate-color-js`]()

```js
import { colorDetection , toHex } from '@dominate-color-js/core'

const url = 'https://i.imgur.com/zgz4G0w_d.webp?maxwidth=760&fidelity=grand'
const colors = colorDetection(url).then(toHex) // we get an array of colors in the hex color space
```


<a><img src="https://i.imgur.com/zgz4G0w_d.webp?maxwidth=760&fidelity=grand" alt="Stoyanov"></a>

## Installation

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

<a><img src="https://i.imgur.com/vaJk09o.png" alt="Stoyanov"></a>


## Installation

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

<a><img src="https://i.imgur.com/t5XP9Fo.png" alt="Stoyanov"></a>
