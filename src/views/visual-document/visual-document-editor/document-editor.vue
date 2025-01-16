<template>
  <div class="document-editor-container">
    <v-md-editor v-model="content" height="100%"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import useVisualDocumentStore from '@/store/modules/visual-document.ts';
  const visualDocumentStore = useVisualDocumentStore();
  const { content } = storeToRefs(visualDocumentStore);
</script>

<style scoped lang="scss">
  .document-editor-container {
    position: relative;
    height: 100%;
    width: 100%;
    .v-md-editor {
      box-shadow: 0 0px 0px #ccc !important;
    }
  }
</style>
