<script setup lang="ts">
defineOptions({
  name: "Success"
});

// const { lastBuildTime } = __APP_INFO__;

const columns = [
  {
    label: "单据类型：",
    value: "单拆"
  },
  {
    label: "运单号：",
    value: "PASUQ065771740"
  },
  {
    label: "箱号箱型",
    value: "PASUQ065771740"
  },
  {
    label: "车牌号：",
    value: "沪DB780"
  },
  {
    label: "派车单号",
    value: "2gA7UqpU5kdZ"
  },
  {
    label: "做箱日期",
    value: "2023-10-18 00:00"
  },
  {
    label: "箱 封 号",
    value: "H717826"
  },
  {
    label: "驾驶员",
    value: "方振远"
  },
  {
    label: "箱 状 态",
    value: "已派车"
  },
  {
    label: "提 箱 点",
    value: "外五码头"
  },
  {
    label: "拆箱门点",
    value: "苗桥路"
  },
  {
    label: "流向",
    value: "烟台"
  },
  {
    label: "备注",
    value: "null"
  }
];
</script>

<template>
  <el-card shadow="never">
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions :columns="columns" class="mb-5" />
      <el-steps :active="2">
        <el-step title="已执行" />
        <el-step title="已提箱" />
        <el-step title="进拆箱门点" />
        <el-step title="出拆箱门点" />
        <el-step title="已还箱" />
        <el-step title="已完成" />
        <el-step title="确认回单" />
      </el-steps>
    </div>
  </el-card>
  <el-card shadow="never">
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions :columns="columns" class="mb-5" />
      <el-steps :active="1">
        <el-step title="已执行" />
        <el-step title="已提箱" />
        <el-step title="进拆箱门点" />
        <el-step title="出拆箱门点" />
        <el-step title="已还箱" />
        <el-step title="已完成" />
        <el-step title="确认回单" />
      </el-steps>
    </div>
  </el-card>
  <el-card shadow="never">
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions :columns="columns" class="mb-5" />
      <el-steps :active="7">
        <el-step title="已执行" />
        <el-step title="已提箱" />
        <el-step title="进拆箱门点" />
        <el-step title="出拆箱门点" />
        <el-step title="已还箱" />
        <el-step title="已完成" />
        <el-step title="确认回单" />
      </el-steps>
    </div>
  </el-card>
  <el-card shadow="never">
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions :columns="columns" class="mb-5" />
      <el-steps :active="5">
        <el-step title="已执行" />
        <el-step title="已提箱" />
        <el-step title="进拆箱门点" />
        <el-step title="出拆箱门点" />
        <el-step title="已还箱" />
        <el-step title="已完成" />
        <el-step title="确认回单" />
      </el-steps>
    </div>
  </el-card>
</template>

<style scoped>
:deep(.el-descriptions__body) {
  background: transparent;
}
</style>
