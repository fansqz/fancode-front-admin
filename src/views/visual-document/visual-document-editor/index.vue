<template>
  <div class="visual-document-container">
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      :append-to-body="false"
      @select="handleSelect"
    >
      <el-menu-item class="text-edit-space"></el-menu-item>
      <el-menu-item index="document">文本编辑</el-menu-item>
      <el-menu-item index="code">代码编辑</el-menu-item>
    </el-menu>

    <div class="title-editor" disabled>
      <div class="text" v-if="!inEditTitle">
        <el-text>{{ title }}</el-text>
        <el-button class="iconfont icon-edit1" link @click.native="handleClickEditTitle()" />
      </div>
      <div class="text-edit" v-if="inEditTitle">
        <el-input size="small" v-model="title">
          <template #suffix>
            <el-button size="small" type="primary" @click="UpdateTitle()" link>确定</el-button>
          </template>
        </el-input>
      </div>
    </div>

    <div class="enable-button">
      <el-switch class="button" v-model="enable" />
    </div>

    <div class="editor-main">
      <DocumentEditor v-if="activeIndex == 'document'" />
      <CodeEditor v-if="activeIndex == 'code'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, watch, ref } from 'vue';
  import { reqVisualDocument } from '@/api/visual-document';
  import DocumentEditor from './document-editor.vue';
  import CodeEditor from './code-editor/index.vue';
  import useVisualDocumentStore from '@/store/modules/visual-document';
  import { storeToRefs } from 'pinia';

  const visualDocumentStore = useVisualDocumentStore();

  const props = defineProps(['id']);
  const emit = defineEmits(['updatedTitle']);

  const activeIndex = ref('document');
  const { id, parentID, title, content, enable, codeList } = storeToRefs(visualDocumentStore);
  const inEditTitle = ref(false);

  // 获取document
  const getVisualDocument = async () => {
    let result = await reqVisualDocument(props.id);
    if (result.code == 200) {
      id.value = result.data.id;
      parentID.value = result.data.parentID;
      title.value = result.data.title;
      content.value = result.data.content;
      enable.value = result.data.enable;
      let list: any[] = [];
      for (let i = 0; i < result.data.codeList.length; i++) {
        const codeItem = result.data.codeList[i];
        // 反序列化 setting 属性
        list.push({
          visualSettingObj: JSON.parse(codeItem.visualSetting),
          ...codeItem,
        });
      }
      codeList.value = list;
    }
  };

  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  // 更新标题
  const UpdateTitle = async () => {
    inEditTitle.value = false;
  };

  const handleClickEditTitle = () => {
    inEditTitle.value = true;
  };

  onMounted(() => {
    getVisualDocument();

    watch(
      () => props.id,
      () => {
        getVisualDocument();
      },
    );
  });
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    .menu {
      top: 0px;
      height: 40px;
      width: 100%;
      .text-edit-space {
        width: 150px;
        margin: 0px 20px;
      }
    }
    .title-editor {
      position: absolute;
      top: 0px;
      display: flex;
      align-self: center;
      width: 150px;
      height: 40px;
      margin: 0px 20px;
      .text {
        display: flex;
        justify-content: space-between;
        width: 150px;
        height: 40px;
      }
      .text-edit {
        margin: auto 0px;
        width: 150px;
      }
    }
    .enable-button {
      position: absolute;
      top: 0px;
      right: 20px;
      width: 40px;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .editor-main {
      position: absolute;
      top: 40px;
      left: 0px;
      height: calc(100% - 40px);
      width: 100%;
    }
  }
</style>
