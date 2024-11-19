<template>
  <div class="box-card">
    <div class="bank-icon">
      <el-image :src="problemBank.icon" />
    </div>
    <div class="bank-message">
      <div class="bank-name">题库名称: {{ problemBank.name }}</div>
      <div class="bank-description">描述: {{ problemBank.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, watch } from 'vue';
  import { reqGetProblemBank } from '@/api/problem-bank';
  import { reqGetURL } from '@/api/common';

  const props = defineProps(['bankID']);
  let problemBank = reactive({
    name: '',
    icon: '',
    description: '',
  });

  const getProblemBank = async (bankID: string) => {
    let result = await reqGetProblemBank(bankID);
    if (result.code == 200) {
      let data = result.data;
      problemBank.name = data.name;
      problemBank.icon = data.icon;
      problemBank.description = data.description;
    }
    // 读取url
    let result2 = await reqGetURL(problemBank.icon);
    if (result2.code == 200) {
      problemBank.icon = result2.data;
    }
  };

  onMounted(() => {
    getProblemBank(props.bankID);
  });

  watch(
    () => props.bankID,
    () => {
      getProblemBank(props.bankID);
    },
  );
</script>

<style scoped lang="scss">
  .box-card {
    height: 150px;
    width: 1000px;
    display: flex;
    box-sizing: border-box;
    border: 1px solid $base-border-color;
    border-radius: 1%;
    box-shadow: 0px 0px 10px rgb(228, 227, 227);
    padding: 0%;
    .bank-icon {
      height: 150px;
      width: 150px;
      img {
        height: 150px;
        width: 150px;
        object-fit: cover;
      }
    }
    .bank-message {
      width: calc(100% - 150px);
      height: 150px;
      background-color: $base-blue-color;
      padding: 30px 60px;
      box-sizing: border-box;
      .bank-name {
        font-size: 30px;
        font-weight: bold;
        color: rgb(53, 54, 54);
      }
    }
  }
</style>
