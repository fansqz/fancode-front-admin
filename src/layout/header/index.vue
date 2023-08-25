<template>
  <div class="tabbar">
    <Logo class="logo"></Logo>
    <div class="tabbar_left">
      <Breadcrumb class="menu_path"></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Logo from '../logo/index.vue';
  import Breadcrumb from './breadcrumb/index.vue';
  import Setting from './setting/index.vue';
</script>

<style scoped lang="scss">
  .tabbar {
    position: relative;
    width: 100%;
    height: 100%;
    .logo {
      position: absolute;
      height: $base-tabbar-height;
      width: 180px;
      left: 0px;
    }
    .tabbar_left {
      position: absolute;
      height: $base-tabbar-height;
      width: 30%;
      left: $base-menu-width;
      top: 0%;
    }
    .tabbar_right {
      position: absolute;
      height: $base-tabbar-height;
      width: 30%;
      right: 0%;
      top: 0%;
    }
  }
</style>
