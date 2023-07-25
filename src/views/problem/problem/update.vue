<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>修改题目</span>
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
                <el-input v-model="problem.code" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题" label-width="auto">
            <el-input v-model="problem.title" />
          </el-form-item>
          <el-form-item label="描述" label-width="auto">
            <el-input v-model="problem.description" type="textarea" :rows="15" />
          </el-form-item>
        </el-form>
      </div>
      <div class="problem-submit">
        <el-button type="primary" @click="changeProblemSubmit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { getProblem, updateProblem } from '@/api/problem';
  import { ProblemForGet } from '@/api/problem/type';
  let $router = useRouter();
  const { id } = $router.currentRoute.value.params;

  // do not use same name with ref
  let problem = reactive<ProblemForGet>({
    id: Number(id as string),
    name: '',
    code: '',
    title: '',
    description: '',
  });

  // 获取题目
  const readProblem = async (id: string) => {
    try {
      let result = await getProblem(id);
      if (result.code == 200) {
        problem.id = result.data.id;
        problem.code = result.data.code;
        problem.description = result.data.description;
        problem.name = result.data.name;
        problem.title = result.data.title;
      }
    } catch (err) {
      ElMessage({
        showClose: true,
        message: '题目读取失败',
        type: 'error',
      });
    }
  };
  onMounted(() => {
    readProblem(id as string);
  });

  // 提交题目修改
  const changeProblemSubmit = async () => {
    try {
      let result = await updateProblem({
        id: problem.id,
        name: problem.name,
        code: problem.code,
        description: problem.description,
        title: problem.title,
      });
      if (result.code == 200) {
        ElMessage({
          showClose: true,
          message: '提交成功',
          type: 'success',
        });
      } else {
        ElMessage({
          showClose: true,
          message: '提交失败',
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

  // closePage 关闭修改页面
  const closePage = () => {
    $router.push('/problem');
  };
</script>

<style scoped>
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
  }
  .problem-submit {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
  }
</style>
