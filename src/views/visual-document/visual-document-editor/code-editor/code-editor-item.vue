<template>
  <splitpanes
    class="default-theme code-editor-splitpanes"
    :dbl-click-splitter="false"
    :push-other-panes="false"
  >
    <pane>
      <VisualDesciptionSetting
        class="visual-setting"
        v-model="model.visualSetting"
      ></VisualDesciptionSetting>
    </pane>

    <!--coding-->
    <pane>
      <CodeEditor
        class="code-editor"
        :code="model.code"
        :language="model.language"
        :breakpoints="model.breakpoints"
      />
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import CodeEditor from './code/index.vue';
  import VisualDesciptionSetting from './visual-setting/index.vue';
  import { VisualSetting } from '@/api/visual-document/type.ts';
  import { defineModel } from 'vue';

  const model = defineModel<{
    code: string;
    language: string;
    breakpoints: number[];
    visualSetting: VisualSetting;
  }>({
    default: {
      code: '',
      language: 'c',
      breakpoints: [],
    },
  });
</script>

<style scoped lang="scss">
  .code-editor-splitpanes {
    position: relative;
    height: 100%;
    width: 100%;
    .visual-setting {
      position: relative;
      height: 100%;
      width: 100%;
    }
    .code-editor {
      position: relative;
      height: 100%;
      width: 100%;
    }
  }
</style>
