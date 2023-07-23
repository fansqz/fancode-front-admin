<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!--没有子路由-->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!--有子路由，但是只有一个-->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="!item.meta.hidden && !item.children[0].meta.hidden"
          :index="item.children[0].path"
        >
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!--有子路由，且个数大于1-->
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
          <FanMenu :menuList="item.children"></FanMenu>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  //获取父组件传递过来的路由
  defineProps(['menuList']);
</script>

<script lang="ts">
  export default {
    name: 'FanMenu',
  };
</script>

<style scoped></style>
