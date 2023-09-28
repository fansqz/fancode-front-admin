<template>
  <div>
    <el-card class="box-card">
      <!--顶部添加题库-->
      <el-button type="primary" size="default" @click="handlerInsertBank"> 添加题库 </el-button>
      <!--展示题库列表-->
      <el-table style="margin: 10px 0px" border :data="problemBankList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="题库名称" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="题目数量" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.createdAt }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="创建者" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.creatorName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="">修改</el-button>
            <el-button type="danger" size="small" icon="Delete" @click="handleDeleteBank(row.id)"
              >删除</el-button
            >
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
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { reqProblemBankList, reqDeleteProblemBank } from '@/api/problem-bank';
  import { ElMessage } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';

  let $router = useRouter();
  let $route = useRoute();

  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储题目列表
  let problemBankList = ref([]);

  const getProblemBankList = async () => {
    let result = await reqProblemBankList({
      page: pageNo.value,
      pageSize: limit.value,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      problemBankList.value = result.data.list;
    }
  };

  const handleDeleteBank = async (id: number) => {
    let result = await reqDeleteProblemBank(id, false);
    ElMessage({
      showClose: true,
      message: result.data,
      type: 'success',
    });
    getProblemBankList();
  };

  // 是否在更新或者添加
  let isInUpdateOrInsert = ref(false);
  // dialog的类型
  let dialogType = ref('update');
  let updateOrInsertBankData = reactive<any>({
    id: '',
    name: '',
    discription: '',
  });

  // 上传题库图标
  const uploadProblemBankIcon = async (params: any) => {
    let result = await reqUploadAvatar({
      avatar: params.file,
    });
    if (result.code == 200) {
      account.avatar = result.data;
      ElMessage({
        type: 'success',
        message: '头像上传成功',
      });
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      });
    }
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
    pageNo.value = 1;
    getProblemBankList();
  };

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params: params });
  };
</script>

<style scoped></style>
