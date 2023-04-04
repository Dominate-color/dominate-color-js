<template>
    <div>
      <div v-if="isLoading">
        <svg width="1.375rem" height="1.375rem" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="mantine-0" role="presentation"><g fill="none" fill-rule="evenodd"><g transform="translate(2.5 2.5)" stroke-width="5"><circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle><path d="M32 16c0-9.94-8.06-16-16-16"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g></svg>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>