<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>修改题目</span>
          <el-button class="button" type="danger" icon="Close" plain circle></el-button>
        </div>
      </template>
      <div>
        <el-form :model="form" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编号">
                <el-input v-model="form.number" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>

          <el-form-item label="文件">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsor" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  // do not use same name with ref
  const form = reactive({
    name: '',
    number: '',
    title: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  const onSubmit = () => {
    console.log('submit!');
  };
</script>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      margin: 0px 10px;
    }
  }
</style>
