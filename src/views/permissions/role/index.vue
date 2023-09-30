<template>
  <el-card class="box-card">
    <el-form :inline="true">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位关键字" v-model="roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleInsertRole">添加角色</el-button>
    <el-table border :data="roleList" style="margin: 10px 0px">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="name" align="center"></el-table-column>
      <el-table-column label="介绍" prop="description" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <!--row:为已有的角色对象-->
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Plus" @click="handleSetPermisstion(row)">
            权限管理
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="handleUpdateRole(row)">
            角色编辑
          </el-button>
          <el-popconfirm :title="`顶真要删除吗`" @confirm="handleDeleteRole(row)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"> 删除 </el-button>
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

  <!--更新或添加角色-->
  <UpdateDialog
    v-model:visible="updateDialogData.visible"
    :roleID="updateDialogData.roleID"
    :type="updateDialogData.type"
    @afterSubmit="getRoleList"
  />

  <!--分配接口与菜单-->
  <PermissionAssign
    v-model:visible="permissionsAssignDrawerData.visible"
    :roleID="permissionsAssignDrawerData.roleID"
    @afterSubmimt="getRoleList"
  />
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { reqRoleList, reqDeleteRole } from '@/api/role';
  import PermissionAssign from './permission-assign.vue';
  import UpdateDialog from './update.vue';

  // 搜索的角色名称
  let roleName = ref<string>();
  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储角色列表
  let roleList = ref([]);
  // 角色更新的dialog的数据
  let updateDialogData = reactive({
    type: 'insert',
    roleID: '',
    visible: false,
  });
  // api和菜单分配的drawer需要的数据
  let permissionsAssignDrawerData = reactive({
    visible: false,
    roleID: '',
  });

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getRoleList();
  });

  const getRoleList = async () => {
    let result = await reqRoleList({
      roleName: roleName.value,
      page: pageNo.value,
      pageSize: limit.value,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      roleList.value = result.data.list;
    }
  };

  // 添加角色
  const handleInsertRole = () => {
    updateDialogData.type = 'update';
    updateDialogData.visible = true;
  };

  // 修改角色
  const handleUpdateRole = (roleID: string) => {
    updateDialogData.roleID = roleID;
    updateDialogData.type = 'insert';
    updateDialogData.visible = true;
  };

  // 处理修改角色的权限
  const handleSetPermisstion = (roleID: string) => {
    permissionsAssignDrawerData.roleID = roleID;
    permissionsAssignDrawerData.visible = true;
  };

  // 删除角色
  const handleDeleteRole = async (row: any) => {
    let result = await reqDeleteRole(row.id);
    ElMessage({
      showClose: true,
      message: result.data,
      type: 'success',
    });
    getRoleList();
  };

  const search = () => {
    pageNo.value = 1;
    getRoleList();
  };

  const resetSearch = () => {
    roleName.value = '';
    pageNo.value = 1;
    getRoleList();
  };

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getRoleList();
  };

  const changePageSize = () => {
    pageNo.value = 1;
    getRoleList();
  };
</script>

<style scoped lang="scss">
  .box-card {
    min-height: 100%;
  }
</style>
