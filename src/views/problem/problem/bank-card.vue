<template>
  <div class="box-card">
    <div class="bank-icon">
      <img :src="problemBank.icon" />
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
    height: 200px;
    display: flex;
    box-sizing: border-box;
    border: 1px solid $base-border-color;
    border-radius: 1%;
    box-shadow: 0px 0px 10px rgb(228, 227, 227);
    padding: 0%;
    .bank-icon {
      height: 200px;
      width: 200px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .bank-message {
      width: calc(100% - 200px);
      height: auto;
      background-color: rgb(77, 164, 251);
      padding: 30px 60px;
      .bank-name {
        font-size: 30px;
        font-weight: bold;
        color: rgb(53, 54, 54);
      }
    }
  }
</style>
