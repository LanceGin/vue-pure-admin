<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
// import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "PayManage"
});

const formRef = ref();
const {
  form,
  loading,
  containerVisible,
  // haveRow,
  columns,
  containerColumns,
  dataList,
  containerList,
  pagination,
  // buttonClass,
  onSearch,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleRowDblclick,
  // handleEdit,
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
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="未提交" value="未提交" />
          <el-option label="未审核" value="未审核" />
          <el-option label="已审核" value="已审核" />
          <el-option label="已记账" value="已记账" />
        </el-select>
      </el-form-item>
      <el-form-item label="供应商：" prop="custom_name">
        <el-input
          v-model="form.custom_name"
          placeholder="请输入供应商"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="结算单位：" prop="company_name">
        <el-input
          v-model="form.company_name"
          placeholder="请输入结算单位"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="银行账号：" prop="account_no">
        <el-input
          v-model="form.account_no"
          placeholder="请输入银行账号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="账期" prop="account_period">
        <el-date-picker
          v-model="form.account_period"
          type="date"
          placeholder="请输入账期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
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
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="containerVisible"
      title="箱子列表"
      width="80%"
      custom-class="container-list"
    >
      <pure-table
        border
        align-whole="center"
        showOverflowTooltip
        highlight-current-row
        :data="containerList"
        :columns="containerColumns"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
      />
    </el-dialog>

    <PureTableBar title="应付管理" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
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
