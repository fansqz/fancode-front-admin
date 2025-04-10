<template>
  <div class="card-body">
    <el-form :model="problem" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" label-width="auto" style="margin-right: 10px">
            <el-input placeholder="请输入题目名称" v-model="problem.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" label-width="auto " style="margin-left: 10px">
            <el-input placeholder="请输入题目编号" v-model="problem.number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标题" label-width="auto">
        <el-input placeholder="请输入题目标题" v-model="problem.title" />
      </el-form-item>
      <el-form-item label="描述" label-width="auto">
        <el-input
          placeholder="请输入题目"
          v-model="problem.description"
          type="textarea"
          :rows="15"
        />
      </el-form-item>
      <el-form-item label="难度" label-width="auto">
        <el-radio-group v-model="problem.difficulty">
          <el-radio border :label="1">简单</el-radio>
          <el-radio border :label="2">偏易</el-radio>
          <el-radio border :label="3">中等</el-radio>
          <el-radio border :label="4">偏难</el-radio>
          <el-radio border :label="5">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支持的编程语言" label-width="auto">
        <el-checkbox-group v-model="problem.languages">
          <el-checkbox v-for="item in supportedLanguages" :label="item"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属题库" label-width="auto">
        <el-select v-model="problem.bankID" placeholder="Select" size="large">
          <el-option :key="-1" :label="'无'" :value="''" />
          <el-option v-for="item in bankList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" label-width="auto">
        <el-switch
          v-model="problem.enable"
          :active-value="1"
          :inactive-value="-1"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #646765"
        />
      </el-form-item>
    </el-form>
  </div>
  <div class="problem-submit">
    <el-button type="primary" @click="changeProblemSubmit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { reqGetProblem, reqUpdateProblem } from '@/api/problem';
  import { reqSimpleProblemBankList } from '@/api/problem-bank';
  import { supportedLanguages } from '@/constants/languages.ts';

  const props = defineProps(['problemID']);
  const emit = defineEmits(['submit']);
  let bankList = ref<any[]>([]);
  let problem = reactive({
    id: '',
    bankID: '',
    name: '',
    number: '',
    difficulty: 1,
    enable: false,
    title: '',
    languages: supportedLanguages,
    description: '',
  });

  // 获取题目
  const readProblem = async (id: string) => {
    try {
      let result = await reqGetProblem(id);
      if (result.code == 200) {
        problem.id = result.data.id;
        problem.bankID = result.data.bankID;
        problem.number = result.data.number;
        problem.difficulty = result.data.difficulty;
        problem.enable = result.data.enable;
        problem.description = result.data.description;
        problem.name = result.data.name;
        problem.title = result.data.title;
        if (result.data.languages != '') {
          problem.languages = result.data.languages.split(',');
        }
      }
    } catch (err) {
      ElMessage({
        showClose: true,
        message: '题目读取失败',
        type: 'error',
      });
    }
  };

  // 提交题目修改
  const changeProblemSubmit = async () => {
    let result = await reqUpdateProblem({
      id: problem.id,
      bankID: problem.bankID,
      name: problem.name,
      number: problem.number,
      difficulty: problem.difficulty,
      enable: problem.enable,
      description: problem.description,
      title: problem.title,
      languages: problem.languages.join(','),
    });
    if (result.code == 200) {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'success',
      });
      emit('submit');
    } else {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
  };

  onMounted(async () => {
    readProblem(props.problemID);
    let result = await reqSimpleProblemBankList();
    if (result.code == 200) {
      bankList.value = result.data;
    }
  });
</script>

<style scoped lang="scss">
  .card-body {
    padding: 0px 30px;
  }
  .problem-submit {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
  }
</style>
