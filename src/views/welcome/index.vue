<script setup lang="ts">
// import { useColumns } from "./columns";
export interface schemaItem {
  field: string;
  label: string;
}

defineOptions({
  name: "About"
});

const { pkg } = __APP_INFO__;
const { dependencies, devDependencies } = pkg;

const schema: schemaItem[] = [];
const devSchema: schemaItem[] = [];

// const { columns } = useColumns();

Object.keys(dependencies).forEach(key => {
  schema.push({ field: dependencies[key], label: key });
});

Object.keys(devDependencies).forEach(key => {
  devSchema.push({ field: devDependencies[key], label: key });
});
</script>

<template>
  <div>
    <el-card class="mb-4 box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">关于</span>
        </div>
      </template>
      <span style="font-size: 15px"> @上海濠瀚科技有限公司 E物流管理系统 </span>
    </el-card>

    <!-- <el-card class="m-4 box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目信息</span>
        </div>
      </template>
      <PureDescriptions :columns="columns" border :column="3" align="left" />
    </el-card>

    <el-card class="m-4 box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">生产环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.label"
          label-align="left"
          align="left"
          v-for="(item, index) in schema"
          :key="index"
        >
          <a
            :href="'https://www.npmjs.com/package/' + item.label"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">{{ item.field }}</span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="m-4 box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">开发环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.label"
          label-align="left"
          align="left"
          v-for="(item, index) in devSchema"
          :key="index"
        >
          <a
            :href="'https://www.npmjs.com/package/' + item.label"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">{{ item.field }}</span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card> -->
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
