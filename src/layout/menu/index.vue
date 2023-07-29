<template>
  <el-menu :default-active="defaultActive">
    <div>
      <template v-for="item in constantMenu" :key="item.index">
        <!--没有子路由-->
        <el-menu-item v-if="!item.childrenMenu" :index="item.index" @click="goRoute(item.path)">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
        <!--有子路由-->
        <el-sub-menu v-if="item.childrenMenu" :index="item.index">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="item2 in item.childrenMenu" :key="item2.index">
            <el-menu-item :index="item2.index" @click="goRoute(item2.path)">
              <template #title>
                <el-icon>
                  <component :is="item2.icon"></component>
                </el-icon>
                <span>{{ item2.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
  import { constantMenu } from '@/router/menu';
  import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  import { ref } from 'vue';
  import { matchPattern } from '@/utils/url_match';

  let $router = useRouter();
  let $route = useRoute();
  //点击菜单回调
  const goRoute = (path: string) => {
    $router.push(path);
  };

  // 根据不同的路由，让不同的menu-item高亮
  const getActive = (path: string) => {
    let activeItem = getActive2(path, constantMenu);
    if (activeItem == '') {
      return 'home';
    } else {
      return activeItem;
    }
  };

  const getActive2 = (path: string, menu: any[]): any => {
    let activeItem = '';
    console.log(menu);
    for (const index in menu) {
      const menuItem = menu[index];
      // 如果有子菜单就走子菜单
      if (menuItem.childrenMenu) {
        activeItem = getActive2(path, menuItem.childrenMenu);
        if (activeItem != '') {
          return activeItem;
        }
        continue;
      }
      if (matchPattern(menuItem.path, path)) {
        return menuItem.index;
      }
      if (menu[index].morePaths) {
        for (const subPath of menu[index].morePaths) {
          if (matchPattern(subPath, path)) {
            return menuItem.index;
          }
        }
      }
    }
    return activeItem;
  };

  // 默认高亮menu-item
  let defaultActive = ref<string>(getActive($route.path));
  console.log($route.path);
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
