## Installation
```sh
npm install @dominate-color-js/core
```

```sh
yarn add @dominate-color-js/core
```

```sh
pnpm install dominate-color-js/core
```

## Usage

#### [`dominate-color-js`]()

```js
import { colorDetection } from '@dominate-color-js/core'

const url = 'https://i.imgur.com/zgz4G0w_d.webp?maxwidth=760&fidelity=grand'
const colors = colorDetection(url).then((colors)=>{
    return colors.map((el)=>{ 
        return `rgba(${el})`
     })
})
```


<a><img src="https://i.imgur.com/zgz4G0w_d.webp?maxwidth=760&fidelity=grand" alt="Stoyanov"></a>