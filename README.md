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

[![react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/gallant-sanne-ii1e7o)


## Installation Vue

```sh
npm install @dominate-color-js/vue
```

## Installation React

```sh
npm install @dominate-color-js/react
```

Example: Example: https://github.com/Dominate-color/dominate-color-js/blob/master/examples/with-react/index.html#L11


[![react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/cranky-gianmarco-0nepq2)


## Installation Solid.js

```sh
npm install @dominate-color-js/solid
```
