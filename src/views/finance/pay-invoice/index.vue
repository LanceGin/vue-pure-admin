<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";n";
import Search from "@iconify-icons/ep/search";
// import AddFill from "@iconify-icons/ri/add-circle-line";
import Edit from "@iconify-icons/ep/edit";

defineOptions({
  name: "Role"
});

const formRef = ref();
const {
  form,
  loading,
  // haveRow,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  // openDialog,
  // handleDatabase,
  handleRowDblclick,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="发票代码：" prop="daima">
        <el-input
          v-model="form.daima"
          placeholder="请输入发票代码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="发票号码：" prop="haoma">
        <el-input
          v-model="form.haoma"
          placeholder="请输入发票号码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="数电票号码：" prop="shudianpiao">
        <el-input
          v-model="form.shudianpiao"
          placeholder="请输入数电票号码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="销方名称：" prop="xiaofangmc">
        <el-input
          v-model="form.xiaofangmc"
          placeholder="请输入销方名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="购方名称：" prop="goufangmc">
        <el-input
          v-model="form.goufangmc"
          placeholder="请输入购方名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="税率：" prop="shuilv">
        <el-input
          v-model="form.shuilv"
          placeholder="请输入税率"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
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
          type="success"
          :icon="useRenderIcon(Edit)"
          :loading="loading"
          @click="onSearch"
        >
          批量登记
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="应付发票管理" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          highlight-current-row
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowDblclick"
          @page-size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
