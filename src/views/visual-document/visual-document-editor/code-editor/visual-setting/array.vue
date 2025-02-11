<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-form-item label="数组名">
      <el-input v-model="model.arrayName" />
    </el-form-item>
    <el-form-item label="取值变量">
      <el-input v-model="pointNamesStr" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, defineModel } from 'vue';
  import { ArrayDescription } from '@/api/visual-document/type.ts';
  let model = defineModel<ArrayDescription>({
    default: {
      arrayName: 'arr',
      pointNames: ['point1', 'point2'],
    },
  });

  const pointNamesStr = ref('');

  watch(
    () => pointNamesStr.value,
    (val) => {
      let arr: string[] = val.split(',').map((item) => {
        return item.trim();
      });
      model.value.pointNames = arr;
    },
  );

  watch(
    () => model.value.pointNames,
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
    pointNamesStr.value = model.value.pointNames.join(',');
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
