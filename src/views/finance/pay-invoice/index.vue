<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";n";
import Search from "@iconify-icons/ep/search";
// import AddFill from "@iconify-icons/ri/add-circle-line";
import Upload from "@iconify-icons/ep/upload";
import Edit from "@iconify-icons/ep/edit";

defineOptions({
  name: "Role"
});

const formRef = ref();
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  openDialog,
  exportExcel,
  // handleDatabase,
  // handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole();

//指定列求和
const getSummaries = param => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    const values = data.map(item => Number(item[column.property]));
    if (["amount", "tax", "total_amount"].includes(column.property)) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return Number(Number(prev + curr).toFixed(2));
        } else {
          return Number(Number(prev).toFixed(2));
        }
      }, 0);
      sums[index];
    }
  });
  return sums;
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="发票代码：" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入发票代码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="发票号码：" prop="no">
        <el-input
          v-model="form.no"
          placeholder="请输入发票号码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="数电票号码：" prop="digital_ticket_no">
        <el-input
          v-model="form.digital_ticket_no"
          placeholder="请输入数电票号码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="销方名称：" prop="seller_name">
        <el-input
          v-model="form.seller_name"
          placeholder="请输入销方名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="购方名称：" prop="buyer_name">
        <el-input
          v-model="form.buyer_name"
          placeholder="请输入购方名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="入账月份" prop="is_invoice">
        <el-date-picker
          v-model="form.is_invoice"
          type="month"
          placeholder="请输入入账月份"
          format="YYYY/MM"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item label="认证期" prop="certification_period">
        <el-date-picker
          v-model="form.certification_period"
          type="month"
          placeholder="请输入认证期"
          format="YYYY/MM"
          value-format="YYYY-MM"
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
          @click="openDialog('批量登记')"
          :disabled="haveRow"
        >
          批量登记
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
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
          show-summary
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handlePageChange"
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
