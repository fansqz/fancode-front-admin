<template>
  <div class="visual-description">
    <img class="visual-img" src="@/assets/images/visual.jpg" />
    <el-collapse ref="visualTemplate" accordion class="visual-description-collapse">
      <el-collapse-item name="1">
        <template #title><el-text class="title">可视化数据定义</el-text></template>
        <div class="visual-description-input">
          <el-table
            size="small"
            ref="singleTableRef"
            class="templateSelect"
            :data="descriptionTypeList"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column>
              <template v-slot="{ row }">
                <div class="item">
                  <i v-if="row.type == model.type" class="selected-icon iconfont icon-Other-10" />
                  <i v-if="row.type != model.type" class="selected-icon iconfont icon-Other-11" />
                  {{ row.name }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="setting">
            <ArraySetting v-if="model.type == descriptions.Array" v-model="arrayDescription" />
            <BinaryTreeSetting
              v-if="model.type == descriptions.BinaryTree"
              v-model="binaryTreeDescription"
            />
            <LinkList v-if="model.type == descriptions.LinkList" v-model="linkListDescription" />
            <Graph v-if="model.type == descriptions.Graph" v-model="graphDescription" />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineModel } from 'vue';
  import { ElTable } from 'element-plus';
  import ArraySetting from './array.vue';
  import BinaryTreeSetting from './binary-tree.vue';
  import LinkList from './link-list.vue';
  import Graph from './graph.vue';
  import { VisualSetting } from '@/api/visual-document/type.ts';
  import { descriptions } from '@/enum/description.ts';
  const model = defineModel<VisualSetting>({
    default: {
      type: descriptions.Array,
    },
  });

  const visualTemplate = ref<HTMLElement>();

  const arrayDescription = ref({
    arrayName: 'arr',
    pointNames: ['point1', 'point2'],
  });
  const binaryTreeDescription = ref({
    treeNode: 'treeNode',
    data: 'val',
    left: 'left',
    right: 'right',
  });
  const linkListDescription = ref({
    linkNode: 'linkNode',
    data: 'data',
    next: 'next',
    prev: 'prev',
  });
  const graphDescription = ref({
    graphNode: 'graphNode',
    // 数据域
    data: 'val',
    nexts: ['next1', 'next2'],
  });
  let descriptionMap = new Map<descriptions, any>([
    [descriptions.Array, arrayDescription],
    [descriptions.BinaryTree, binaryTreeDescription],
    [descriptions.LinkList, linkListDescription],
    [descriptions.Graph, graphDescription],
  ]);

  if (descriptionMap.has(model.value.type)) {
    let desciption = descriptionMap.get(model.value.type);
    if (desciption != undefined) {
      desciption.value = model.value.description;
    }
  }

  const singleTableRef = ref<InstanceType<typeof ElTable>>();
  const descriptionTypeList = ref([
    {
      name: '一维数组',
      type: descriptions.Array,
    },
    {
      name: '二叉树',
      type: descriptions.BinaryTree,
    },
    {
      name: '链表',
      type: descriptions.LinkList,
    },
    {
      name: '图',
      type: descriptions.Graph,
    },
  ]);

  // 选择了其他可视化模板
  const handleCurrentChange = async (val: any) => {
    if (val.type != model.value.type) {
      model.value.type = val.type;
      let description = descriptionMap.get(model.value.type);
      if (description != undefined) {
        model.value.description = description.value;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .visual-description {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: $background-color;
    .visual-img {
      width: 100%;
      height: 70%;
    }
    .visual-description-collapse {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: auto;
      border-bottom: 0px;
      .title {
        margin: 20px;
      }
      .visual-description-input {
        box-sizing: border-box;
        width: 100%;
        height: 30%;
        display: flex;
        .templateSelect {
          width: 20%;
          margin-left: 20px;
          margin-right: 10px;
          height: 150px;
          .item {
            display: flex;
            .selected-icon {
              position: relative;
              font-size: 15px !important;
              margin: auto 2px;
              color: rgb(90, 180, 253);
            }
          }
        }
        .setting {
          width: calc(80% - 100px);
          height: 150px;
        }
      }
    }
  }
</style>
