<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span> {{ '修改题目' }}</span>
        <el-button
          class="button"
          type="danger"
          icon="Close"
          plain
          circle
          @click="closePage"
        ></el-button>
      </div>
    </template>
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="base-editer"> 基本信息修改 </el-menu-item>
      <el-menu-item index="case-editer"> 用例修改 </el-menu-item>
    </el-menu>
    <BaseEditer v-if="activeIndex == 'base-editer'" :problemID="problemID"> </BaseEditer>
    <Case v-if="activeIndex == 'case-editer'" :problemID="problemID"> </Case>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import BaseEditer from './base-editer.vue';
  import Case from './problem-case/index.vue';
  const props = defineProps(['problemID']);
  const emit = defineEmits(['exit']);
  const activeIndex = ref('base-editer');

  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  onMounted(() => {
    console.log(props);
  });
  // closePage 关闭修改页面
  const closePage = () => {
    emit('exit');
  };
</script>

<style scoped lang="scss">
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        margin: 0px 10px;
      }
    }
    .menu {
      height: 40px;
      bottom: 20px;
    }
  }
</style>
