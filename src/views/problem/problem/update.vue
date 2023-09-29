<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span> {{ type == 'update' ? '修改题目' : '添加题目' }}</span>
          <el-button
            class="button"
            type="danger"
            icon="Close"
            plain
            circle
            @click="closePage"
          ></el-button>
        </div>
      </template>
      <div class="card-body">
        <el-form :model="problem" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" label-width="auto" style="margin-right: 10px">
                <el-input v-model="problem.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编号" label-width="auto " style="margin-left: 10px">
                <el-input v-model="problem.number" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题" label-width="auto">
            <el-input v-model="problem.title" />
          </el-form-item>
          <el-form-item label="描述" label-width="auto">
            <el-input v-model="problem.description" type="textarea" :rows="15" />
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
              <el-checkbox :label="'c'">C</el-checkbox>
              <el-checkbox :label="'java'">Java</el-checkbox>
              <el-checkbox :label="'go'">Go</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所属题库" label-width="auto">
            <el-select v-model="problem.bankID" placeholder="Select" size="large">
              <el-option :key="-1" :label="'无'" :value="''" />
              <el-option
                v-for="item in bankList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
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
        <div class="file">
          <el-upload
            class="upload-demo"
            drag
            :on-change="uploadChange"
            :limit="1"
            auto-upload="false"
            action="#"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text"> Drop file here or <em>click to upload</em> </div>
          </el-upload>
          <el-text type="info">{{
            problem.path == '' ? '题目还没有文件' : '该题目已含有文件'
          }}</el-text>
          <el-link type="primary" @click="downloadProblemFile" v-if="problem.path != ''"
            >点击下载</el-link
          >
          <el-text type="info"> 或者你希望下载模板文件 </el-text>
          <el-link type="primary" @click="downloadProblemTemplateFile">点击下载</el-link>
        </div>
      </div>
      <div class="problem-submit">
        <el-button type="primary" @click="changeProblemSubmit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watchEffect, ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import {
    reqGetProblem,
    reqUpdateProblem,
    reqDownloadProblemFile,
    reqDownloadProblemTemplateFile,
    reqInsertProblem,
  } from '@/api/problem';
  import download from '@/utils/download';
  import { reqSimpleProblemBankList } from '@/api/problem-bank';

  const props = defineProps(['type', 'problemID', 'defaultBankID']);
  const emit = defineEmits(['exit', 'submit']);
  let bankList = ref<any[]>([]);
  let problem = reactive({
    id: '',
    bankID: '',
    name: '',
    number: '',
    difficulty: 1,
    enable: false,
    title: '',
    languages: [],
    description: '',
    path: '',
  });
  let problemFile: File;

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
        problem.path = result.data.path;
        problem.title = result.data.title;
        problem.languages = result.data.languages.split(',');
      }
    } catch (err) {
      ElMessage({
        showClose: true,
        message: '题目读取失败',
        type: 'error',
      });
    }
  };

  // 类型或者题目id发生改变时改变problem数据
  watchEffect(async () => {
    if (props.type == 'insert') {
      // 创建题目
      let result = await reqInsertProblem({
        bankID: props.defaultBankID,
      });
      readProblem(result.data);
    } else {
      readProblem(props.problemID);
    }
  });

  // 文件改变时修改
  const uploadChange = (file: any, fileList: any) => {
    fileList[0] = file;
    problemFile = fileList[0].raw;
  };

  // 提交题目修改
  const changeProblemSubmit = async () => {
    try {
      let result = await reqUpdateProblem({
        id: problem.id,
        bankID: problem.bankID,
        name: problem.name,
        number: problem.number,
        difficulty: problem.difficulty,
        enable: problem.enable,
        description: problem.description,
        title: problem.title,
        file: problemFile,
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
    } catch {
      ElMessage({
        showClose: true,
        message: '提交失败',
        type: 'error',
      });
    }
  };

  const downloadProblemFile = async () => {
    let result = await reqDownloadProblemFile(problem.id);
    console.log(result);
    download(result, problem.id + '.zip');
  };

  const downloadProblemTemplateFile = async () => {
    let result = await reqDownloadProblemTemplateFile();
    console.log(result);
    download(result, '编程文件模板.zip');
  };

  onMounted(async () => {
    let result = await reqSimpleProblemBankList();
    if (result.code == 200) {
      bankList.value = result.data;
    }
  });

  // closePage 关闭修改页面
  const closePage = () => {
    emit('exit');
  };
</script>

<style scoped>
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        margin: 0px 10px;
      }
    }
    .card-body {
      padding: 0px 30px;
      .file {
        padding: 50px;
      }
    }
    .problem-submit {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: auto;
    }
  }
</style>
