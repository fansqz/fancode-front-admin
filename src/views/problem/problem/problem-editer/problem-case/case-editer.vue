<template>
  <!--修改或添加题库-->
  <el-dialog class="dialog" v-model="visible" :title="type == 'update' ? '用例修改' : '用例添加'">
    <el-form class="form">
      <el-form-item label="用例名称:">
        <el-input placeholder="请输入用例名称" v-model="caseData.name"></el-input>
      </el-form-item>
      <el-form-item label="输入数据:">
        <el-input
          placeholder="请输入输入数据"
          type="textarea"
          :rows="3"
          v-model="caseData.input"
        ></el-input>
      </el-form-item>
      <el-form-item label="输出数据:">
        <el-input
          placeholder="请输入输出数据"
          type="textarea"
          :rows="3"
          v-model="caseData.output"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive, watch, computed } from 'vue';
  import { reqProblemCase, reqInsertProblemCase, reqUpdateProblemCase } from '@/api/case';
  import { ElMessage } from 'element-plus';

  // type = update or insert
  const props = defineProps(['id', 'visible', 'type', 'problemID']);
  const emit = defineEmits(['update:visible', 'afterSubmit']);
  // 题库数据
  let caseData = reactive<any>({
    name: '',
    input: '',
    output: '',
  });
  // dialog是否可见
  const visible = computed({
    get() {
      return props.visible;
    },
    set(value) {
      emit('update:visible', value);
    },
  });

  const getProblemCase = async (caseID: string) => {
    if (props.type == 'update') {
      let result = await reqProblemCase(caseID);
      if (result.code == 200) {
        let data = result.data;
        caseData.name = data.name;
        caseData.input = data.input;
        caseData.output = data.output;
      } else {
        ElMessage({
          type: 'error',
          message: result.message,
        });
      }
    }
  };

  // 提交，如果type是insert则添加，如果是update则更新
  const submit = async () => {
    let result: any;
    if (props.type == 'insert') {
      result = await reqInsertProblemCase({
        problemID: props.problemID,
        ...caseData,
      });
    } else {
      result = await reqUpdateProblemCase({
        id: props.id,
        problemID: props.problemID,
        ...caseData,
      });
    }
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: result.message,
      });
      visible.value = false;
      emit('afterSubmit');
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      });
    }
  };

  watch(
    () => props.visible,
    () => {
      if (props.type == 'insert') {
        caseData.name = '';
        caseData.output = '';
        caseData.input = '';
      } else {
        getProblemCase(props.id);
      }
    },
  );
</script>

<style lang="scss" scoped>
  .dialog {
    .form {
      width: 90%;
      margin: auto;
    }
  }
</style>
