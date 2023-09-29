<template>
  <!--修改或添加题库-->
  <el-dialog class="dialog" v-model="visible" :title="type == 'update' ? '题库更新' : '题库修改'">
    <el-form>
      <el-form-item label="图标" label-width="100px">
        <!--头像-->
        <el-upload
          class="icon-upload"
          :show-file-list="false"
          :http-request="uploadProblemBankIcon"
          :before-upload="beforeUpload"
        >
          <img v-if="bankData.icon" :src="bankData.icon" class="bank-icon" />
          <el-icon v-else class="icon-upload-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="题库名称">
        <el-input placeholder="请输入题库名称" v-model="bankData.name"></el-input>
      </el-form-item>
      <el-form-item label="题库描述">
        <el-input placeholder="请输入题库描述" v-model="bankData.discription"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitAddOrUpdateBank">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, watch, computed } from 'vue';
  import {
    reqUploadProblemBankIcon,
    reqGetProblemBank,
    reqInsertProblemBank,
    reqUpdateProblemBank,
  } from '@/api/problem-bank';
  import { ElMessage } from 'element-plus';

  // type = update or insert
  const props = defineProps(['type', 'bankID', 'visible']);
  const emit = defineEmits(['update:visible', 'afterSubmit']);
  // 题库数据
  let bankData = reactive<any>({
    icon: '',
    name: '',
    description: '',
  });
  // dialog是否可见
  const visible = computed({
    get() {
      return props.visible;
    },
    set(value) {
      emit('update:visible', value);
    },
  });

  // 添加文件并校验
  const beforeUpload = (file: any) => {
    // 检验
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      ElMessage.error('上传图片大小不能超过 2MB！');
      return false;
    }
    return true;
  };

  // 上传题库图标
  const uploadProblemBankIcon = async (params: any) => {
    let result = await reqUploadProblemBankIcon({
      icon: params.file,
    });
    if (result.code == 200) {
      bankData.icon = result.data;
      ElMessage({
        type: 'success',
        message: '题库图标上传成功',
      });
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      });
    }
  };

  const getProblemBank = async (bankID: string) => {
    if (props.type == 'update') {
      let result = await reqGetProblemBank(bankID);
      if (result.code == 200) {
        let data = result.data;
        bankData.icon = data.icon;
        bankData.name = data.name;
        bankData.description = data.description;
      } else {
        ElMessage({
          type: 'error',
          message: result.message,
        });
      }
    }
  };

  const submitAddOrUpdateBank = async () => {
    let result: any;
    if (props.type == 'insert') {
      result = await reqInsertProblemBank(bankData);
    } else {
      result = await reqUpdateProblemBank({
        id: props.bankID,
        icon: bankData.icon,
        name: bankData.name,
        description: bankData.description,
      });
    }
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: result.message,
      });
      visible.value = false;
      emit('afterSubmit');
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      });
    }
  };

  //组件挂载完毕以后获取数据
  onMounted(() => {
    if (props.type == 'update') {
      getProblemBank(props.bankID);
    }
  });

  watch(
    () => props.visible,
    () => {
      if (props.type == 'insert') {
        bankData.icon = '';
        bankData.name = '';
        bankData.description = '';
      } else {
        getProblemBank(props.bankID);
      }
    },
  );
</script>

<style lang="scss" scoped>
  .dialog {
    .icon-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      .bank-icon {
        width: 178px;
        height: 178px;
        display: block;
      }
      .icon-upload-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        text-align: center;
      }
    }
  }
</style>
