## Installation

```sh
npm install @dominate-color-js/vue
```

```sh
yarn add @dominate-color-js/vue
```

```sh
pnpm add @dominate-color-js/vue
```


### Basic Example

```js
<template>
    <div>
      <input type="file" @change="handleFileInput" />
      <ul>
        <li v-for="(color, index) in colors" :key="index">{{ color }}</li>
      </ul>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error.message }}</div>
    </div>
</template>

<script lang="ts">
   import { useColorDetection } from '@dominate-color-js/vue';

   export default {  
        setup() { 
            const { handler, colors, loading, error } = useColorDetection();

            const handleFileInput = (event: any) => {
                const file = event.target.files[0];
                handler(file);
            };

            return { colors, loading, error, handleFileInput };
            }   
        }
</script>
```

a more detailed [version](https://github.com/Dominate-color/dominate-color-js/tree/master/examples/with-vue)