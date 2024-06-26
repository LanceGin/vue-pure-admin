<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
// import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "PayCheck"
});

const formRef = ref();
const {
  form,
  loading,
  containerVisible,
  columns,
  containerColumns,
  dataList,
  // containerList,
  filterTableData,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleApprove,
  handleReject,
  handleSizeChange,
  handleCurrentChange,
  handlePageChange,
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
      <el-form-item label="供应商：" prop="custom_name">
        <el-input
          v-model="form.custom_name"
          placeholder="请输入供应商名"
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
      <el-form-item label="账期" prop="account_period">
        <el-date-picker
          v-model="form.account_period"
          type="month"
          placeholder="请输入账期"
          format="YYYY/MM"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item label="地区：" prop="city_type">
        <el-select
          v-model="form.city_type"
          placeholder="请选择地区"
          clearable
          class="!w-[180px]"
        >
          <el-option label="上海" value="上海" />
          <el-option label="太仓" value="太仓" />
          <el-option label="武汉" value="武汉" />
          <el-option label="岳阳" value="岳阳" />
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
        :data="filterTableData"
        :columns="containerColumns"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
            导出
          </el-button>
        </div>
      </template>
    </el-dialog>

    <PureTableBar title="应付费用列表" :columns="columns" @refresh="onSearch">
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
          @row-dblclick="handleRowDblclick"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @page-current-change="handlePageChange"
        >
          <template #operation="{ row }">
            <el-popconfirm
              :title="`是否确认通过客户名称为${row.custom_name}的这条数据`"
              @confirm="handleApprove(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(EditPen)"
                >
                  审核通过
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              :title="`是否确认退回客户名称为${row.custom_name}的这条数据`"
              @confirm="handleReject(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="danger"
                  :size="size"
                  :icon="useRenderIcon(EditPen)"
                >
                  拒绝退回
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
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

.my-header {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
}
</style>
