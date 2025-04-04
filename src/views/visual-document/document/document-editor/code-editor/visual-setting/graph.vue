<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-form-item label="图节点">
      <el-input v-model="model.graphNode" />
    </el-form-item>
    <el-form-item label="节点值">
      <el-input v-model="model.data" />
    </el-form-item>
    <el-form-item label="next指针">
      <el-input v-model="pointNamesStr" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, defineModel } from 'vue';
  import { GraphDescription } from '@/api/visual-document/type.ts';
  let model = defineModel<GraphDescription>({
    default: {
      graphNode: 'graphNode',
      // 数据域
      data: 'val',
      nexts: ['next1', 'next2'],
    },
  });

  const pointNamesStr = ref('');

  watch(
    () => pointNamesStr.value,
    (val) => {
      let arr: string[] = val.split(',').map((item) => {
        return item.trim();
      });
      model.value.nexts = arr;
    },
  );

  watch(
    () => model.value.nexts,
    (val) => {
      let arr: string[] = pointNamesStr.value.split(',').map((item) => {
        return item.trim();
      });
      if (JSON.stringify(val) != JSON.stringify(arr)) {
        pointNamesStr.value = val.join(',');
      }
    },
    {
      deep: true,
    },
  );

  onMounted(() => {
    pointNamesStr.value = model.value.nexts.join(',');
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
