<template>
  <div class="container">
    <div class="root-node"
      ><el-button link size="samll" class="button" @click="clickAddVisualDocument(0)"
        >+</el-button
      ></div
    >
    <el-tree
      :data="data"
      :props="props"
      highlight-current="true"
      :expand-on-click-node="false"
      :current-node-key="id"
      draggable
      default-expand-all
      node-key="id"
      class="directory-tree"
      indent="8"
      @node-click="clickEditorVisualDocument"
      @node-drag-end="handleUpdateDocumentParent"
    >
      <template #default="scope">
        <div class="tree_item">
          <el-text>{{ scope.node.label }}</el-text>
          <el-button
            link
            size="samll"
            class="button"
            @click="clickAddVisualDocument(scope.node.data)"
            >+</el-button
          >
        </div>
      </template>
    </el-tree>
    <div v-if="!notVisualDocumentData" class="editor">
      <VisualDocumentEditor
        :key="id"
        @updatedTitle="getDirectory()"
        @handleDocumentDelete="selectFirstDocument()"
        @handleDocumentNotFound="selectFirstDocument()"
      />
    </div>
    <div v-if="notVisualDocumentData" class="not-record">
      <el-text>无数据</el-text>
    </div>

    <el-dialog v-model="visualDocumentForAdd.visible" title="新建可视化文档">
      <el-input v-model="visualDocumentForAdd.title" placeholder="未命名文档" />
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              () => {
                visualDocumentForAdd.visible = false;
              }
            "
            >取消</el-button
          >
          <el-button @click="addVisualDocument()" type="primary">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import {
    reqVisualDocumentDirectory,
    reqInsertVisualDocument,
    reqUpdateVisualDocumentDirectory,
  } from '@/api/visual-document';
  import { onMounted, reactive, ref } from 'vue';
  import VisualDocumentEditor from './visual-document-editor/index.vue';
  import { defaultDocument } from './visual-document-editor/document-editor/default-document';
  import useVisualDocumentStore from '@/store/modules/visual-document';
  import { storeToRefs } from 'pinia';

  const visualDocumentStore = useVisualDocumentStore();

  const { id } = storeToRefs(visualDocumentStore);
  const data = ref<any[]>([]);
  const props = {
    children: 'children',
    label: 'title',
  };

  // 标记是否没有可视化文档数据
  const notVisualDocumentData = ref(false);

  // 添加可视化文档的数据
  const visualDocumentForAdd = reactive({
    visible: false,
    parentID: 0,
    title: '',
    content: '',
    enable: false,
  });

  const clickEditorVisualDocument = (node: any) => {
    id.value = node.id;
  };

  const clickAddVisualDocument = (node: any) => {
    visualDocumentForAdd.parentID = node.id;
    visualDocumentForAdd.title = '未命名';
    visualDocumentForAdd.content = defaultDocument;
    visualDocumentForAdd.enable = false;
    visualDocumentForAdd.visible = true;
  };

  // 更新文档父节点
  const handleUpdateDocumentParent = async (draggingNode: any, dropNode: any, dropType: any) => {
    if (draggingNode.data.id == dropNode.data.id) {
      return;
    }
    await reqUpdateVisualDocumentDirectory(draggingNode.data.id, dropNode.data.id, dropType);
    // 更新目录
    getDirectory();
  };

  // 更新目录并选择第一篇文档
  const selectFirstDocument = async () => {
    await getDirectory();
    if (data.value.length != 0) {
      id.value = data.value[0].id;
    } else {
      // 目录无数据
      notVisualDocumentData.value = true;
    }
  };

  // 添加可视化文档
  const addVisualDocument = async () => {
    let result = await reqInsertVisualDocument({
      parentID: visualDocumentForAdd.parentID,
      title: visualDocumentForAdd.title,
      content: visualDocumentForAdd.content,
      enable: visualDocumentForAdd.enable,
    });
    if ((result.code = 200)) {
      // 如果一开始是无数据状态，设置为有数据
      if (notVisualDocumentData.value == true) {
        notVisualDocumentData.value = false;
      }
      // 获取新的目录
      await getDirectory();
      id.value = result.data;
    }
    visualDocumentForAdd.visible = false;
  };

  const getDirectory = async () => {
    let result = await reqVisualDocumentDirectory();
    if (result.code == 200) {
      data.value = result.data;
    }
  };

  onMounted(async () => {
    await getDirectory();
    // 如果id为0，那么选择第一篇文档
    if (id.value == 0) {
      if (data.value.length != 0) {
        id.value = data.value[0].id;
      } else {
        // 目录无数据
        notVisualDocumentData.value = true;
      }
    }
  });
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    height: calc(100% - 30px);
    width: calc(100% - 20px);
    box-shadow: 0px 0px 10px rgb(220, 220, 220);
    border-radius: 5px;
    .root-node {
      position: absolute;
      top: 0px;
      width: 200px;
      height: 40px;
      border-right: 1px solid $base-border-color;
      border-bottom: 1px solid $base-border-color;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .button {
        margin-right: 6px;
      }
    }
    .directory-tree {
      position: absolute;
      top: 40px;
      width: 200px;
      height: calc(100% - 40px);
      border-right: 1px solid $base-border-color;
      box-sizing: border-box;
      .tree_item {
        width: 100%;
        height: 26px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .button {
          margin-right: 6px;
        }
      }
    }
    .editor {
      position: absolute;
      width: calc(100% - 200px);
      height: 100%;
      top: 0px;
      left: 200px;
      margin: 0px;
    }
    .not-record {
      position: absolute;
      width: calc(100% - 200px);
      height: 100%;
      top: 0px;
      left: 200px;
      margin: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
