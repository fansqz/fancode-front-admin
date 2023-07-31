<template>
  <el-card class="box-card">
    <el-form :inline="true">
      <el-form-item label="用户名称搜索">
        <el-input placeholder="请输入用户名称关键字" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="clickInsertUser">添加用户</el-button>
    <el-table border :data="userList" style="margin: 10px 0px">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="登录id" prop="loginName" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
      <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
      <el-table-column label="电话" prop="phone" align="center"></el-table-column>
      <el-table-column label="角色列表" prop="roles" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <!--row:为已有角色对象-->
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Plus" @click="handleSetUserRole(row)">
            关联角色
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="handleUpdateUser(row)">
            用户编辑
          </el-button>
          <el-popconfirm :title="`顶真要删除吗`" @confirm="deleteUser(row)">
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

    <!--修改或添加用户-->
    <el-dialog v-model="dialogVisible" :title="getDialogTitle()">
      <el-form>
        <el-form-item label="用户id">
          <el-input placeholder="请输入用户id" v-model="userData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input placeholder="请输入用户名称" v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="userData.phone"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" v-show="formType==1">
            <el-input placeholder="请输入密码" v-model="userData.password" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddOrUpdateUser">确定</el-button>
      </template>
    </el-dialog>

    <!--分配角色-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名称："> {{ username2 }} </el-form-item>
          <el-form-item lable="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleSelectAll">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="selectedRoleIDs" @change="handleRoleSelectChange">
              <el-checkbox v-for="(role, index) in roles" :key="index" :label="role.id">
                {{ role.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="submitUpdateUserRole">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import {
    reqUserList,
    reqInsertUser,
    reqUpdateUser,
    reqDeleteUser,
    reqUserRole,
    reqUpdateUserRole,
    reqSimpleRoleList
  } from '@/api/user';
  import { ElMessage } from 'element-plus';

  // 搜索的用户名称
  let username = ref<string>();
  //当前页码
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  // 存储用户列表
  let userList = ref<any[]>([]);

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getUserList();
  });

  const getUserList = async () => {
    let result = await reqUserList({
      username: username.value,
      page: pageNo.value,
      pageSize: limit.value,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      userList.value = result.data.list;
    }
  };

    // 修改或更新用户
    let userData = reactive<any>({
    id: '',
    loginName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  // 表单是添加还是修改
  let formType = ref<number>(1);
  let dialogVisible = ref<boolean>(false);

  // 添加用户
  const clickInsertUser = () => {
    formType.value = 1;
    dialogVisible.value = true;
    userData.loginName = '';
    userData.username = '';
    userData.email = '';
    userData.phone = '';
    userData.password = '';
  };

  // 修改用户
  const handleUpdateUser = (row: any) => {
    formType.value = 0;
    dialogVisible.value = true;
    Object.assign(userData, row);
  };

  const submitAddOrUpdateUser = async () => {
    let result :any;
    if (formType.value == 1) {
      result = await reqInsertUser(userData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getUserList();
      }
    } else {
      result = await reqUpdateUser(userData);
      if (result.code == 200) {
        dialogVisible.value = false;
        getUserList();
      }
    }
          ElMessage({
          showClose: true,
          message: result.message,
          type: result.code == 200 ? 'success' : 'error',
        });
  };

  // 控制抽屉显示与隐藏
  let drawer = ref<boolean>(false);
  // 更新用户关联角色页面的数据
  let userID = 0;
  let username2 = ref<string>('');
  let  checkAll = ref<boolean>(false);
  let indeterminate = ref<boolean>(true);
  let roles = ref<any[]>([]);
  let selectedRoleIDs = ref<number[]>([]);

  // 点击设置用户的角色
  const handleSetUserRole = async (row: any) => {
    userID = row.id;
    let result = await reqSimpleRoleList();
    if (result.code == 200) {
      roles.value = result.data;
    }
    result = await reqUserRole(row.id);
    if (result.code == 200) {
      selectedRoleIDs.value = result.data;
    }
    userID = row.id;
    username2.value = row.username;
    drawer.value = true;
  };

  const handleSelectAll = (val:boolean) => {
    selectedRoleIDs.value = val ? roles.value.map((role:any) => role.id) : [];
    indeterminate.value = false;
  };

  const handleRoleSelectChange = () => {
    if (selectedRoleIDs.value == roles.value.map((role:any) => role.id)) {
      indeterminate.value = false;
    } else {
      indeterminate.value = true;
    }
  };

  // 提交添加权限请求
  const submitUpdateUserRole = async () => {
    let result = await reqUpdateUserRole(userID, selectedRoleIDs.value);
    if (result.code == 200) {
      drawer.value = false;
      getUserList();
    } 
    ElMessage({
        showClose: true,
        message: result.message,
        type: result.code == 200 ? 'success' : 'error',
      });
  };

  const deleteUser = async (row: any) => {
    let result = await reqDeleteUser(row.id);
    ElMessage({
      showClose: true,
      message: result.message,
      type: result.code == 200 ? 'success' : 'error',
    });
    getUserList();
  };

  const search = () => {
    pageNo.value = 1;
    getUserList();
  };

  const resetSearch = () => {
    username.value = '';
    pageNo.value = 1;
    getUserList();
  };

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getUserList();
  };

  const changePageSize = () => {
    pageNo.value = 1;
    getUserList();
  };

  const getDialogTitle = () => {
    if (formType.value == 1) {
      return '添加用户';
    } else {
      return '修改用户';
    }
  };
</script>

<style scoped lang="scss">
  .box-card {
    min-height: 100%;
  }
</style>
