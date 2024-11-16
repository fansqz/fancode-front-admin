<template>
  <div class="card-body">
    <div class="search">
      <el-row :gutter="20" justify="space-between">
        <el-col :span="10">
          <el-input v-model="listQuery.name" clearable placeholder="请输入用例名称" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search"> 查询 </el-button>
          <el-button @click="reset"> 重置 </el-button>
        </el-col>
      </el-row>
    </div>
    <el-button class="insert-button" size="small" type="primary" @click="handleInsertProblemCase"
      >添加用例 +</el-button
    >
    <el-table style="margin: 10px 0px" border :data="problemCaseList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="用例名称" width="150px" align="center">
        <template v-slot="{ row }">
          <pre style="word-break: break-all; overflow: hidden">{{ row.name }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="输入" width="200px" align="center">
        <template v-slot="{ row }">
          <el-tooltip :content="row.input" placement="bottom" effect="light">
            <el-text style="word-break: break-all; overflow: hidden" truncated>{{
              row.input
            }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="输出" width="200px" align="center">
        <template v-slot="{ row }">
          <el-tooltip :content="row.output" placement="bottom" effect="light">
            <el-text style="word-break: break-all; overflow: hidden" truncated>{{
              row.output
            }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px" align="center">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="handleUpdateProblemCase(row.id)"
          />
          <el-popconfirm :title="`顶真要删除吗`" @confirm="handleDeleteProblemCase(row.id)">
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
      :page-sizes="[5, 10, 20, 30]"
      :background="true"
      layout="prev, pager, next, jumper, ->,sizes, total"
      :total="total"
      style="margin: 0px 3%"
    />

    <CaseEditer
      :id="updateDialogData.id"
      :problemID="problemID"
      v-model:visible="updateDialogData.visible"
      :type="updateDialogData.type"
      @afterSubmit="getProblemCaseList"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { reqProblemCaseList, reqDeleteProblemCase } from '@/api/case';
  import CaseEditer from './case-editer.vue';
  import { ElMessage } from 'element-plus';

  const props = defineProps(['problemID']);
  const listQuery = reactive({
    name: '',
    page: 1,
    pageSize: 5,
  });

  // 管理更新或者添加用例的dialog
  const updateDialogData = reactive({
    id: '',
    type: 'insert',
    visible: false,
  });
  // 每页展示多少条数据
  let total = ref<number>(0);
  let problemCaseList = ref([]);

  const getProblemCaseList = async () => {
    let result = await reqProblemCaseList({
      problemID: props.problemID,
      ...listQuery,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      problemCaseList.value = result.data.list;
    }
  };

  // 更新用例
  const handleUpdateProblemCase = (id: string) => {
    updateDialogData.id = id;
    updateDialogData.type = 'update';
    updateDialogData.visible = true;
  };

  // 添加用例
  const handleInsertProblemCase = () => {
    updateDialogData.id = '';
    updateDialogData.type = 'insert';
    updateDialogData.visible = true;
  };

  // 删除用例
  const handleDeleteProblemCase = async (id: string) => {
    let result = await reqDeleteProblemCase(id);
    if (result.code == 200) {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'success',
      });
      getProblemCaseList();
    } else {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
  };

  onMounted(() => {
    getProblemCaseList();
  });

  const search = () => {
    getProblemCaseList();
  };

  const reset = () => {
    listQuery.page = 1;
    getProblemCaseList();
  };

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getProblemCaseList();
  };

  const changePageSize = () => {
    listQuery.page = 1;
    getProblemCaseList();
  };
</script>

<style scoped lang="scss">
  .card-body {
    .search {
      padding-bottom: 10px;
      border-bottom: 1px solid #d8d8d8;
    }
    .insert-button {
      margin-top: 15px;
    }
    padding: 0px 30px;
  }
</style>
