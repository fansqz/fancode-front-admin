<template>
  <div class="container">
    <BankCard
      class="bank-card"
      v-if="listQuery.bankID && !isUpdateOrInsert"
      :bankID="listQuery.bankID"
    />
    <el-card v-if="!isUpdateOrInsert" class="problem-card">
      <!--搜索框-->
      <template #header>
        <div class="search">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model="listQuery.number" clearable placeholder="请输入题目编号" />
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.name" clearable placeholder="请输入题目名称" />
            </el-col>
            <el-col :span="6">
              <el-select v-model="listQuery.difficulty" placeholder="Select">
                <el-option :key="1" :label="'简单'" :value="1" />
                <el-option :key="2" :label="'偏易'" :value="2" />
                <el-option :key="3" :label="'中等'" :value="3" />
                <el-option :key="4" :label="'偏难'" :value="4" />
                <el-option :key="5" :label="'困难'" :value="5" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="search"> 查询 </el-button>
              <el-button @click="reset"> 重置 </el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <!--顶部添加题目-->
      <el-button type="primary" size="default" @click="handleInsertProblem"> 添加题目 </el-button>
      <!--展示题目列表-->
      <el-table style="margin: 10px 0px" border :data="problemList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="题目编号" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.number }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="题目名称" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="难度" width="60px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.difficulty }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="90px" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.enable"
              :active-value="1"
              :inactive-value="-1"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #646765"
              @click="handleEnableProblem(row.id, row.enable)"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px" align="center">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleUpdateProblem(row.id)"
            />
            <el-popconfirm :title="`顶真要删除吗`" @confirm="handleDeleteProblem(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器组件-->
      <el-pagination
        @current-change="changePageNo"
        @size-change="changePageSize"
        v-model:current-page="listQuery.page"
        v-model:page-size="listQuery.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        style="margin: 0px 3%"
      />
    </el-card>

    <!--添加题目的组件-->
    <Update
      v-if="isUpdateOrInsert"
      @exit="closeUpdatePage"
      @submit="closeUpdatePage"
      :problemID="problemID"
      :type="type"
    ></Update>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import { reqProblemList, reqDeleteProblem, reqUpdateProblemEnable } from '@/api/problem';
  import Update from './update.vue';
  import BankCard from './bank-card.vue';

  const $route = useRoute();
  // 搜索的参数
  let listQuery = reactive({
    page: 1,
    pageSize: 10,
    bankID: $route.params.bankID,
    number: '',
    name: '',
    difficulty: 1,
  });
  let total = ref(0);
  // 存储题目列表
  let problemList = ref([]);

  const getProblemList = async () => {
    let result = await reqProblemList(listQuery);
    if (result.code == 200) {
      total.value = result.data.total;
      problemList.value = result.data.list;
    }
  };

  const handleDeleteProblem = async (id: string) => {
    let result = await reqDeleteProblem(id);
    ElMessage({
      showClose: true,
      message: result.data,
      type: 'success',
    });
    getProblemList();
  };

  const handleEnableProblem = async (id: number, enable: string) => {
    let result = await reqUpdateProblemEnable(id, enable);
    if (result.code == 200) {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'success',
      });
    } else {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
    getProblemList();
  };

  // 搜索
  const search = () => {
    getProblemList();
  };

  // 重置
  const reset = () => {
    listQuery.number = '';
    listQuery.name = '';
    listQuery.difficulty = 1;
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

  // 页面大小改变时触发
  const changePageSize = () => {
    listQuery.page = 1;
    getProblemList();
  };

  const isUpdateOrInsert = ref(false);
  const problemID = ref('');
  const type = ref('insert');
  const handleUpdateProblem = (id: string) => {
    isUpdateOrInsert.value = true;
    problemID.value = id;
    type.value = 'update';
  };

  const handleInsertProblem = async () => {
    isUpdateOrInsert.value = true;
    type.value = 'insert';
  };

  // closePage 关闭修改页面
  const closeUpdatePage = () => {
    isUpdateOrInsert.value = false;
    // 读取数据
    getProblemList();
  };
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /*所有子元素都垂直居中了*/
    .bank-card {
      width: 90%;
      margin: 10px;
    }
    .problem-card {
      width: 90%;
    }
  }
</style>
