<template>
  <el-menu :default-active="defaultActive">
    <div>
      <template v-for="item in constantMenu" :key="item.index">
        <!--没有子路由-->
        <el-menu-item :index="item.index" @click="goRoute(item.path)">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
  import { constantMenu } from '@/router/menu';
  import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  import { ref } from 'vue';

  let $router = useRouter();
  let $route = useRoute();
  //点击菜单回调
  const goRoute = (path: string) => {
    $router.push(path);
  };

  // 根据不同的路由，让不同的menu-item高亮
  const getActive = (path: string) => {
    let activeItem = 'home';
    for (const index in constantMenu) {
      const menuItem = constantMenu[index];
      if (menuItem.path === path) {
        activeItem = menuItem.index;
        break;
      }
      for (const subIndex in menuItem.morePaths) {
        const subPath = menuItem.morePaths[subIndex];
        if (subPath === path) {
          activeItem = menuItem.index;
          break;
        }
      }
    }
    return activeItem;
  };
  // 默认高亮menu-item
  let defaultActive = ref<string>(getActive($route.path));
  onBeforeRouteUpdate((to) => {
    console.log(to.path);
    defaultActive.value = getActive(to.path);
  });
</script>

<script lang="ts">
  export default {
    name: 'FanMenu',
  };
</script>

<style scoped>
  .el-menu {
    border-right: none;
  }
</style>
