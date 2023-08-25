<template>
  <div class="menu_dev">
    <el-breadcrumb class="menu_path" separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  let $route = useRoute();
</script>

<style scoped>
  .menu_dev {
    position: relative;
    width: 100%;
    height: 100%;
    .menu_path {
      position: absolute;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 20%;
    }
  }
</style>
