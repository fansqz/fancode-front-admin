<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="链表节点">
          <el-input v-model="model.linkNode" />
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
        <el-form-item label="prev指针">
          <el-input v-model="model.prev" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="next指针">
          <el-input v-model="model.next" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { LinkListDescription } from '@/api/visual-document/type.ts';
  import { defineModel } from 'vue';
  let model = defineModel<LinkListDescription>({
    default: {
      linkNode: 'linkNode',
      data: 'data',
      next: 'next',
      prev: 'prev',
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
