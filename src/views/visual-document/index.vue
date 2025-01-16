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
      draggable
      default-expand-all
      node-key="id"
      class="directory-tree"
      indent="8"
      @node-click="clickEditorVisualDocument"
    >
      <template #default="scope">
        <div class="tree_item">
          <el-text>{{ scope.node.label }}</el-text>
          <el-button link size="samll" class="button">+</el-button>
        </div>
      </template>
    </el-tree>
    <div class="editor">
      <VisualDocumentEditor
        :key="visualDocumentID"
        :id="visualDocumentID"
        @updatedTitle="getDirectory()"
      />
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
  import { reqVisualDocumentDirectory, reqInsertVisualDocument } from '@/api/visual-document';
  import { onMounted, reactive, ref } from 'vue';
  import VisualDocumentEditor from './visual-document-editor/index.vue';

  const data = ref<any[]>([]);
  const props = {
    children: 'children',
    label: 'title',
  };
  const visualDocumentID = ref(0);

  const visualDocumentForAdd = reactive({
    visible: false,
    parentID: 0,
    title: '',
    content: '',
    enable: false,
  });

  const clickEditorVisualDocument = (node: any) => {
    visualDocumentID.value = node.id;
  };

  const clickAddVisualDocument = (parentID: number) => {
    visualDocumentForAdd.parentID = parentID;
    visualDocumentForAdd.title = '';
    visualDocumentForAdd.content = '';
    visualDocumentForAdd.enable = false;
    visualDocumentForAdd.visible = true;
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
      // 获取新的目录
      await getDirectory();
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
  }
</style>
