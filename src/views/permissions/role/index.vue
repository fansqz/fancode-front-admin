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
    <el-button type="primary" @click="insertRole">添加角色</el-button>
    <el-table border :data="roleList" style="margin: 10px 0px">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="name" align="center"></el-table-column>
      <el-table-column label="介绍" prop="description" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <!--row:为已有的菜单对象-->
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Plus" @click="setPermisstion(row)">
            权限管理
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">
            角色编辑
          </el-button>
          <el-popconfirm :title="`顶真要删除吗`" @confirm="deleteRole(row)">
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

    <!--修改或添加角色-->
    <el-dialog v-model="dialogVisible" :title="getDialogTitle()">
      <el-form>
        <el-form-item label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input placeholder="请输入角色简介" v-model="menuData.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddOrUpdateRole">确定</el-button>
      </template>
    </el-dialog>

    <!--分配接口与菜单-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div>
          <div inlink="true">
            <el-radio size="large" v-model="apiTreeShow" label="1"> 接口管理 </el-radio>
            <el-radio size="large" v-model="apiTreeShow" label="2"> 菜单管理 </el-radio>
          </div>

          <el-tree
            v-show="apiTreeShow == '1'"
            :data="apiTree"
            ref="tree1"
            show-checkbox
            default-expand-all
            check-strictly
            node-key="id"
            :default-checked-keys="roleApis"
            :props="defaultProps"
          />
          <el-tree
            v-show="apiTreeShow == '2'"
            :data="menuTree"
            ref="tree2"
            show-checkbox
            default-expand-all
            check-strictly
            node-key="id"
            :default-checked-keys="roleMenus"
            :props="defaultProps"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="submitRolePermisstion">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import {
    reqRoleList,
    reqInsertRole,
    reqUpdateRole,
    reqDeleteRole,
    reqRoleApi,
    reqUpdateRoleApi,
    reqUpdateRoleMenu,
    reqRoleMenu,
  } from '@/api/role';
  import { reqGetApiTree } from '@/api/api';
  import { reqGetMenuTree } from '@/api/menu';
  import { ElMessage } from 'element-plus';

  // 搜索的角色名称
  let roleName = ref<string>();
  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储角色列表
  let roleList = ref([]);
  // 修改或更新角色
  let menuData = reactive({
    id: '',
    name: '',
    description: '',
  });
  // 表示menu的类型，是添加还是修改
  let menuType = ref<number>(1);
  let dialogVisible = ref<boolean>(false);
  // 控制抽屉显示与隐藏
  let drawer = ref<boolean>(false);
  // 展示menu树/ 展示api树
  let menuTree = ref([]);
  let apiTree = ref([]);
  let roleApis = ref([]);
  let roleMenus = ref([]);
  let apiTreeShow = ref('1');
  let tree1 = ref();
  let tree2 = ref();
  let roleID = '';
  const defaultProps = {
    chidren: 'children',
    label: 'name',
  };

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

  // 添加菜单
  const insertRole = () => {
    menuType.value = 1;
    dialogVisible.value = true;
    menuData.id = '';
    menuData.name = '';
    menuData.description = '';
  };

  // 修改菜单
  const updateRole = (row: any) => {
    menuType.value = 0;
    dialogVisible.value = true;
    menuData.id = row.id;
    menuData.name = row.name;
    menuData.description = row.description;
  };

  const submitAddOrUpdateRole = async () => {
    if (menuType.value == 1) {
      const result = await reqInsertRole(menuData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getRoleList();
        ElMessage({
          showClose: true,
          message: '角色添加成功',
          type: 'success',
        });
      } else {
        ElMessage({
          showClose: true,
          message: '角色添加失败',
          type: 'error',
        });
      }
    } else {
      const result = await reqUpdateRole(menuData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getRoleList();
        ElMessage({
          showClose: true,
          message: '角色更新成功',
          type: 'success',
        });
      } else {
        ElMessage({
          showClose: true,
          message: '角色更新失败',
          type: 'error',
        });
      }
    }
  };

  const setPermisstion = async (row: any) => {
    roleID = row.id;
    drawer.value = true;
    let result = await reqGetApiTree();
    if (result.code == 200) {
      apiTree.value = result.data;
    }
    result = await reqGetMenuTree();
    if (result.code == 200) {
      menuTree.value = result.data;
    }
    result = await reqRoleApi(row.id);
    if (result.code == 200) {
      roleApis.value = result.data;
    }
    result = await reqRoleMenu(row.id);
    if (result.code == 200) {
      roleMenus.value = result.data;
    }
  };

  // 提交添加权限请求
  const submitRolePermisstion = async () => {
    let apiIDs = tree1.value.getCheckedKeys();
    let menuIDs = tree2.value.getCheckedKeys();
    let result1 = await reqUpdateRoleApi({ roleID: roleID, apiIDs: apiIDs });
    let result2 = await reqUpdateRoleMenu({ roleID: roleID, menuIDs: menuIDs });
    if (result1.code == 200 && result2.code == 200) {
      ElMessage({
        showClose: true,
        message: '提交成功',
        type: 'success',
      });
      //关闭抽屉
      drawer.value = false;
      getRoleList();
    } else {
      ElMessage({
        showClose: true,
        message: '操作失败',
        type: 'error',
      });
    }
  };

  const deleteRole = async (row: any) => {
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

  const getDialogTitle = () => {
    if (menuType.value == 1) {
      return '添加角色';
    } else {
      return '修改角色';
    }
  };
</script>

<style scoped lang="scss">
  .box-card {
    min-height: 100%;
  }
</style>
