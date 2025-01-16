<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="二叉树节点">
          <el-input v-model="model.treeNode" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="节点值">
          <el-input v-model="model.data" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="左指针">
          <el-input v-model="model.left" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="右指针">
          <el-input v-model="model.right" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { BinaryTreeDescription } from '@/api/visual-document/type.ts';
  import { defineModel } from 'vue';
  let model = defineModel<BinaryTreeDescription>({
    default: {
      treeNode: 'treeNode',
      data: 'val',
      left: 'left',
      right: 'right',
    },
  });
</script>

<style lang="scss" scoped>
  .arrayDescription {
    height: 100%;
    width: 100%;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
