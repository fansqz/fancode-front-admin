<template>
  <div>
    <el-card class="box-card">
      <!--搜索框-->
      <template #header>
        <div class="search">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model="listQuery.name" clearable placeholder="请输入题库名称" />
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.description" clearable placeholder="请输入题库描述" />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="search"> 查询 </el-button>
              <el-button @click="reset"> 重置 </el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <!--顶部添加题库-->
      <el-button type="primary" size="default" @click="handlerInsertBank"> 添加题库 </el-button>
      <!--展示题库列表-->
      <el-table style="margin: 10px 0px" border :data="problemBankList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="题库名称" align="center">
          <template v-slot="{ row }">
            <TextButton @click="handlerProblemManage(row.id)" :text="row.name" />
          </template>
        </el-table-column>
        <el-table-column label="题目数量" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.problemCount }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="创建者" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.creatorName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="handlerUpdateBank(row.id)" />
            <el-popconfirm :title="`顶真要删除吗`" @confirm="handleDeleteBank(row.id)">
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

      <BankUpdate
        v-model:visible="updateDialogData.visible"
        :type="updateDialogData.type"
        :bankID="updateDialogData.bankID"
        @afterSubmit="getProblemBankList"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reqProblemBankList, reqDeleteProblemBank } from '@/api/problem-bank';
  import BankUpdate from './update.vue';
  import { ref, onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';

  let $router = useRouter();

  let listQuery = reactive({
    page: 1,
    pageSize: 10,
    name: '',
    description: '',
  });
  let total = ref(0);
  let problemBankList = ref([]);

  // 管理更新或者添加题库的dialog
  let updateDialogData = reactive({
    bankID: '',
    type: 'insert',
    visible: false,
  });

  const getProblemBankList = async () => {
    let result = await reqProblemBankList(listQuery);
    if (result.code == 200) {
      total.value = result.data.total;
      problemBankList.value = result.data.list;
    }
  };

  const handleDeleteBank = async (id: string) => {
    let result = await reqDeleteProblemBank(id, false);
    ElMessage({
      showClose: true,
      message: result.data,
      type: 'success',
    });
    getProblemBankList();
  };

  // 更新题库
  const handlerUpdateBank = (id: string) => {
    updateDialogData.bankID = id;
    updateDialogData.type = 'update';
    updateDialogData.visible = true;
  };

  // 添加题库
  const handlerInsertBank = () => {
    updateDialogData.bankID = '';
    updateDialogData.type = 'insert';
    updateDialogData.visible = true;
  };

  const handlerProblemManage = (bankID: string) => {
    $router.push({
      name: 'bank-problem',
      params: {
        bankID: bankID,
      },
    });
  };

  const search = () => {
    getProblemBankList();
  };

  const reset = () => {
    listQuery.name = '';
    listQuery.description = '';
  };

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getProblemBankList();
  });

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getProblemBankList();
  };

  const changePageSize = () => {
    listQuery.page = 1;
    getProblemBankList();
  };
</script>

<style scoped></style>
