<template>
  <div>
    <el-card class="box-card">
      <!--顶部添加题目-->
      <el-button type="primary" size="default" @click="addProblem"> 添加题目 </el-button>
      <!--展示题目列表-->
      <el-table style="margin: 10px 0px" border :data="problemList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="题目编号" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.code }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="题目名称" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="changeProblem(row.id)"
              >修改</el-button
            >
            <el-button type="danger" size="small" icon="Delete" @click="deleteProblem(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器组件-->
      <el-pagination
        @current-change="changePageNo"
        @size-change="changePageSize"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        style="margin: 0px 3%"
      />
    </el-card>

    <!--添加对话框-->
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { reqProblemList, reqCreateProblem,reqDeleteProblem } from '@/api/problem';
  import type { ProblemListResponseData, ProblemForList } from '@/api/problem/type';
  import router from '@/router';
  import { ElMessage } from 'element-plus';

  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储题目列表
  let problemList = ref<ProblemForList[]>([]);

  const getProblemList = async () => {
    let result: ProblemListResponseData = await reqProblemList(pageNo.value, limit.value);
    if (result.code == 200) {
      total.value = result.data.total;
      problemList.value = result.data.list;
    }
  };

  const addProblem = async () => {
    // 创建题目
    let result = await reqCreateProblem();
    if (result.code == 200) {
      router.push('/problem/update/' + result.data);
    } else {
      ElMessage({
        showClose: true,
        message: '题目创建失败',
        type: 'error',
      });
    }
  };

  const changeProblem = (id: string) => {
    router.push('/problem/update/' + id);
  };

  const deleteProblem = async (id: number) => {
    let result = await reqDeleteProblem(id);
    ElMessage({
      showClose: true,
        message: result.data,
        type: 'success',
    });
    getProblemList();
  };

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getProblemList();
  });

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getProblemList();
  };

  const changePageSize = () => {
    pageNo.value = 1;
    getProblemList();
  };
</script>

<style scoped></style>
