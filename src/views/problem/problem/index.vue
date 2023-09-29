<template>
  <div class="container">
    <BankCard
      class="bank-card"
      v-if="bankID && !isUpdateOrInsert"
      :bankID="bankID"
    />
    <el-card v-if="!isUpdateOrInsert" class="problem-card">
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
        <el-table-column label="难度" width="100px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.difficulty }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="150px" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.enable"
              :active-value="1"
              :inactive-value="-1"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #646765"
              @click="handleEnableProblem(row.id, row.enable)"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="handleUpdateProblem(row.id)"
              >修改</el-button
            >
            <el-popconfirm :title="`顶真要删除吗`" @confirm="handleDeleteProblem(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
          </el-popconfirm>
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
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import { reqProblemList, reqDeleteProblem, reqUpdateProblemEnable } from '@/api/problem';
  import Update from './update.vue';
  import BankCard from './bank-card.vue';
  
  const $route = useRoute();
  // 所属题库id
  let bankID = ref($route.params.bankID);
  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储题目列表
  let problemList = ref([]);

  const getProblemList = async () => {
    let result = await reqProblemList({
      bankID: bankID.value,
      page: pageNo.value,
      pageSize: limit.value,
    });
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
    display:flex;
    flex-direction: column;
    align-items:center;/*所有子元素都垂直居中了*/
    .bank-card {
      width: 90%;
      margin: 10px;
    }
    .problem-card {
      width: 90%;
    }
  }

</style>
