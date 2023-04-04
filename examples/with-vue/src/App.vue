<script lang="ts">
  import Loader from './components/Loader.vue'
  import { IconPhoto , IconPhotoSearch , IconSearchOff } from '@tabler/icons-vue';
  import { useColorDetection } from "@dominate-color-js/vue"
  import type { UploadFile } from 'element-plus'
  import { ref } from 'vue'

  export default {
  components: { IconPhoto , IconPhotoSearch , IconSearchOff , Loader },
  setup(){ 
    const stateFile = ref<File | null>(null)
    const { colors ,loading , reset ,error , handler } = useColorDetection()
    return { colors, loading , reset , error , dropzonehandler(file: UploadFile) {
        stateFile.value = file.raw as File
     } , submit() {
        if(stateFile.value instanceof File) {   
          handler(stateFile.value)
         }
      }}
  }
}
</script>

<template>
  <el-container class="subroot center">
    <el-space>
      <el-space direction="vertical" :size="20" fill>
      <el-upload class="dropzone center" :limit="1" accept="image/png, image/jpeg" :multiple="false" :on-change="dropzonehandler">
        <IconPhoto :size="50" :stroke-width="1.5"/>
      </el-upload>
      <el-button type="success" @click="submit" >
        <Loader :is-loading="loading" />
        <IconPhotoSearch v-if="loading === false"/>
      </el-button>
    </el-space>
    <el-space class="container" direction="vertical" :size="20" wrap>
      <div class="not-found" v-if="colors.length <= 0">
        <IconSearchOff />
      </div>
      <div class="colors__content" v-else v-for="color in colors" :style="{ backgroundColor: color }" :key="color" />
    </el-space>
    </el-space>
  </el-container>
</template>

<style lang="css">

  body { 
    padding: 0;
    margin: 0;
  }

  .subroot { 
    height: 100svh;
    height: 100vh;
   }

  .center { 
    display: flex;
    justify-content: center;
    align-items: center;
   }

  .dropzone { 
    width: 86px;
    height: 86px;
    background-color: var(--el-color-info-light-8);
    border: var(--el-border-radius-small) dashed  var(--el-color-info-light-3);
    border-radius: var(--el-border-radius-small);
  }

  .not-found { 
    width: 100px;
    height: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c1c2c5;
    background: rgba(255,255,255,.1);
    border-radius: 0.25rem;
  }

  .container {
    height: 145px; 
    min-width: 100px;
    display: flex;
    gap: 1.25rem
  }

  .colors__content  {
    border-radius: 0.25rem; 
    width: 1.75rem;
    height: 1.75rem;
  }
</style>
