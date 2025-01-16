<template>
  <div ref="editorEl" class="editor" />
</template>

<script lang="ts" setup>
  import { ref, watch, toRefs, onMounted } from 'vue';
  import { editor } from 'monaco-editor';
  import { setBreakPoint, initBreakPoint } from './breakpoint';

  let editorInstance: editor.IStandaloneCodeEditor;
  let props = defineProps<{
    code: string;
    language: string;
    breakpoints: number[];
  }>();

  const { code, language, breakpoints } = toRefs(props);

  const editorEl = ref<HTMLElement>();

  onMounted(() => {
    if (editorEl.value == undefined) {
      return;
    }
    // 创建editor实例
    editorInstance = editor.create(editorEl.value, {
      language: language.value,
      value: code.value,
      readOnly: false,
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
    });

    // 初始化断点
    initBreakPoint(editorInstance, breakpoints.value);

    watch(
      () => language.value,
      async (val) => {
        const model = editorInstance.getModel();
        if (model) {
          //设置语言
          editor.setModelLanguage(model, val);
        }
      },
    );

    watch(
      () => code.value,
      (val) => {
        editorInstance?.setValue(val);
      },
    );

    setBreakPoint(editorInstance, function (bps: number[], _lineNum: number, _mode: 'add' | 'del') {
      // 设置断点
      breakpoints.value = bps;
    });
  });
</script>

<style scoped lang="scss">
  @import './style/breakPoint.scss';
  @import './style/debug.scss';
  .editor {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100% !important;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
