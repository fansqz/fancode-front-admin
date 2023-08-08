<template>
  <template v-for="item in menuList" :key="item.path">
    <!--没有子路由-->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--有子路由，但是只有一个-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.meta.hidden && !item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--有子路由，且个数大于1-->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <FanMenu :menuList="item.children"></FanMenu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  //获取父组件传递过来的路由
  defineProps(['menuList']);

  let $router = useRouter();
  //点击菜单回调
  const goRoute = (vc: any) => {
    $router.push(vc.index);
  };
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
