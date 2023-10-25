<script setup lang="ts">
defineOptions({
  name: "Success"
});

// const { lastBuildTime } = __APP_INFO__;
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import EditPen from "@iconify-icons/ep/edit-pen";

import { ref } from "vue";

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

const loading = ref(false);
function onSearch() {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);
}
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="出口运单号：" prop="yundanhao">
        <el-input placeholder="请输入出口运单号" clearable class="!w-[200px]" />
      </el-form-item>
      <el-form-item label="进口运单号：" prop="yundanhao">
        <el-input placeholder="请输入进口运单号" clearable class="!w-[200px]" />
      </el-form-item>

      <el-form-item label="派车单号：" prop="zuoxiangshijian">
        <el-input placeholder="请输入派车单号" clearable class="!w-[200px]" />
      </el-form-item>

      <el-form-item label="车牌号：" prop="mendian">
        <el-input placeholder="请输入车牌号" clearable class="!w-[200px]" />
      </el-form-item>

      <el-form-item label="做箱时间：" prop="xianghao">
        <el-input placeholder="请输入做箱时间" clearable class="!w-[200px]" />
      </el-form-item>
      <el-form-item label="箱号：" prop="chuanming">
        <el-input placeholder="请输入箱号" clearable class="!w-[200px]" />
      </el-form-item>
      <el-form-item label="箱型：" prop="check_on_type">
        <el-select placeholder="请选择箱型" clearable class="!w-[180px]">
          <el-option label="20GP" value="0" />
          <el-option label="40GP" value="1" />
          <el-option label="20TK" value="2" />
          <el-option label="40HC" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="单据类型：" prop="check_on_type">
        <el-select placeholder="请选择单据类型" clearable class="!w-[180px]">
          <el-option label="单装" value="0" />
          <el-option label="单拆" value="1" />
          <el-option label="合派" value="2" />
          <el-option label="打包" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="check_on_type">
        <el-select placeholder="请选择状态" clearable class="!w-[180px]">
          <el-option label="全部" value="0" />
          <el-option label="未完成" value="1" />
          <el-option label="已完成" value="2" />
          <el-option label="未收回单" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          :loading="loading"
          @click="onSearch"
        >
          一键完成
        </el-button>
      </el-form-item>
    </el-form>
    <el-card shadow="never">
      <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
        <PureDescriptions :columns="columns" class="mb-5" />
        <el-steps :active="2">
          <el-step title="已执行" />
          <el-step title="已提箱">
            <template #description>
              <el-button type="danger" link> 退回 </el-button>
            </template>
          </el-step>
          <el-step title="进拆箱门点" />
          <el-step title="出拆箱门点" />
          <el-step title="已还箱" />
          <el-step title="已完成" />
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
          <el-step title="已完成">
            <template #description>
              <el-button type="danger" link> 退回 </el-button>
            </template>
          </el-step>
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
          <el-step title="已还箱">
            <template #description>
              <el-button type="danger" link> 退回 </el-button>
            </template>
          </el-step>
          <el-step title="已完成" />
        </el-steps>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
:deep(.el-descriptions__body) {
  background: transparent;
}
</style>
