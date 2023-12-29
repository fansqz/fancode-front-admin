<template>
  <!--修改或添加题库-->
  <el-dialog class="dialog" v-model="visible" :title="type == 'update' ? '用例修改' : '用例添加'">
    <el-form class="form" ref="ruleFormRef" :model="caseData" :rules="rules">
      <el-form-item label="用例名称:" prop="name">
        <el-input placeholder="请输入用例名称" v-model="caseData.name"></el-input>
      </el-form-item>
      <el-form-item label="输入数据:" prop="input">
        <el-input
          placeholder="请输入输入数据"
          type="textarea"
          :rows="3"
          v-model="caseData.input"
        ></el-input>
      </el-form-item>
      <el-form-item label="输出数据:" prop="output">
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
      <el-button type="primary" @click="submit(ruleFormRef)">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive, watch, computed, ref } from 'vue';
  import {
    reqProblemCase,
    reqInsertProblemCase,
    reqUpdateProblemCase,
    reqGenerateNewProblemCaseName,
    reqCheckProblemCaseName,
  } from '@/api/case';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';

  // type = update or insert
  const props = defineProps(['id', 'visible', 'type', 'problemID']);
  const emit = defineEmits(['update:visible', 'afterSubmit']);

  // 用例数据
  const caseData = reactive<any>({
    name: '',
    input: '',
    output: '',
  });
  const ruleFormRef = ref<FormInstance>();

  // dialog是否可见
  const visible = computed({
    get() {
      return props.visible;
    },
    set(value) {
      emit('update:visible', value);
    },
  });

  // 校验规则，用例名称不可重复
  const validateCaseName = (_rule: any, value: any, callback: any) => {
    reqCheckProblemCaseName(props.id, value, props.problemID).then((result: any) => {
      if (result.code !== 200) {
        callback(new Error('系统错误，请重试'));
      } else if (!result.data) {
        callback(new Error('用例名称重复！'));
      } else {
        callback();
      }
    });
  };

  // 表单校验
  const rules = reactive<FormRules<typeof caseData>>({
    name: [
      { required: true, message: '请输入用例名', trigger: 'blur' },
      { validator: validateCaseName, trigger: 'blur' },
    ],
    input: [
      {
        required: true,
        message: '输入数据不能为空',
        trigger: 'change',
      },
    ],
    output: [
      {
        required: true,
        message: '输出数据不能为空',
        trigger: 'change',
      },
    ],
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
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
      return;
    }
    await formEl.validate();
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
    async () => {
      if (props.type == 'insert') {
        let result = await reqGenerateNewProblemCaseName(props.problemID);
        if (result.code == 200) {
          caseData.name = result.data;
        }
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
