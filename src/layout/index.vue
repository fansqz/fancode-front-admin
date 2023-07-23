<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider">
      <div class=""></div>
      <el-scrollbar class="scrollbar">
        <el-menu :default-active="$route.path">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!--顶部tabbar-->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>

    <!--展示栏-->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Menu from './menu/index.vue';
  // 获取用户仓库
  import useUserStore from '@/store/modules/user';
  import Main from './main/index.vue';
  import Tabbar from './tabbar/index.vue';

  let userStore = useUserStore();
  let $route = useRoute();
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100vw;
    height: 100vh;

    .layout_slider {
      box-sizing: border-box;
      position: relative;
      width: $base-menu-width;
      height: calc(100vh - $base-tabbar-height);
      background: $base-menu-background;
      top: $base-tabbar-height;
      border-right: 1px solid $border-color;
      .scrollbar {
        position: fixed;
        width: $base-menu-width - 1px;
        height: calc(100% - $base-tabbar-height);
        bottom: 0%;
        .el-menu {
          border-right: none;
        }
      }
    }
    .layout_tabbar {
      box-sizing: border-box;
      position: fixed;
      width: 100%;
      height: $base-tabbar-height;
      background-color: $base-tabbar-background;
      top: 0;
      border-bottom: 1px solid $border-color;
    }
    .layout_main {
      box-sizing: border-box;
      position: fixed;
      width: calc(100vw - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background-color: aliceblue;
      top: $base-tabbar-height;
      left: $base-menu-width;
      padding: 20px;
      overflow: auto;
    }
  }
</style>
