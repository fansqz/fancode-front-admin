<template>
  <el-card class="box-card">
    <el-table :data="apiTree" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="请求方式" prop="method" width="150"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Plus" @click="addApi(row)"> 添加 </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            :disabled="row.parentApiID == 0"
            @click="updateApi(row)"
          >
            编辑
          </el-button>
          <el-popconfirm :title="`顶真要删除吗`" @confirm="deleteApi(row)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" :disabled="row.parentApiID == 0">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--修改或添加-->
    <el-dialog v-model="dialogVisible" :title="getDialogTitle()">
      <el-form>
        <el-form-item label="接口名称">
          <el-input placeholder="请输入接口名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="请求路径">
          <el-input placeholder="请输入请求路径" v-model="menuData.path"></el-input>
        </el-form-item>
        <el-form-item label="请求方法">
          <el-input placeholder="请输入请求方法" v-model="menuData.method"></el-input>
        </el-form-item>
        <el-form-item label="概述">
          <el-input placeholder="请输入接口概述" v-model="menuData.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="SubmitAddOrUpdateApi">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { reqGetApiTree, reqInsertApi, reqUpdateApi, reqDeleteApi } from '@/api/api';
  import { ElMessage } from 'element-plus';

  let apiTree = ref([]);
  // 添加api/修改api页面是否显示
  let dialogVisible = ref<boolean>(false);
  // api数据
  let menuData = reactive({
    id: '',
    name: '',
    path: '',
    method: '',
    description: '',
    parentApiID: 0,
  });
  // 用于标识是添加还是修改api，1标识添加，0表示修改
  let menuType = ref(1);
  //请求
  onMounted(() => {
    getApiTree();
  });

  // 获取api树
  const getApiTree = async () => {
    let result = await reqGetApiTree();
    if (result.code == 200) {
      apiTree.value = result.data;
    }
  };

  // 添加接口
  const addApi = (row: any) => {
    menuType.value = 1;
    dialogVisible.value = true;
    menuData.id = '';
    menuData.parentApiID = row.id;
    menuData.path = row.path;
    menuData.method = '';
    menuData.description = '';
  };

  // 修改接口
  const updateApi = (row: any) => {
    menuType.value = 0;
    dialogVisible.value = true;
    menuData.id = row.id;
    menuData.name = row.name;
    menuData.path = row.path;
    menuData.method = row.method;
    menuData.description = row.description;
    menuData.parentApiID = row.parentApiID;
  };

  // 提交 添加接口/修改接口 的请求
  const SubmitAddOrUpdateApi = async () => {
    if (menuType.value == 1) {
      const result = await reqInsertApi(menuData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getApiTree();
        ElMessage({
          showClose: true,
          message: '接口添加成功',
          type: 'success',
        });
      } else {
        ElMessage({
          showClose: true,
          message: '接口添加失败',
          type: 'error',
        });
      }
    } else {
      const result = await reqUpdateApi(menuData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getApiTree();
        ElMessage({
          showClose: true,
          message: '接口更新成功',
          type: 'success',
        });
      } else {
        ElMessage({
          showClose: true,
          message: '接口更新失败',
          type: 'error',
        });
      }
    }
  };

  const getDialogTitle = () => {
    return menuType.value == 1 ? '添加接口' : '修改接口';
  };

  // 删除api
  const deleteApi = async (row: any) => {
    let result = await reqDeleteApi(row.id);
    if (result.code == 200) {
      getApiTree();
      ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success',
      });
    } else {
      ElMessage({
        showClose: true,
        message: '删除失败',
        type: 'error',
      });
    }
  };
</script>

<style scoped lang="scss">
  .box-card {
    height: 100%;
  }
</style>
