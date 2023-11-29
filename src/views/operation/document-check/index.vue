<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
import AddFill from "@iconify-icons/ri/add-circle-line";

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
  exportExcel,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleSubmit,
  handleEdit,
  // handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  // handleCurrentChange,
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
      <el-form-item label="客户" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="子项目" prop="subproject">
        <el-input
          v-model="form.subproject"
          placeholder="请输入子项目名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="order_type">
        <el-select
          v-model="form.order_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="进口" value="进口" />
          <el-option label="出口" value="出口" />
        </el-select>
      </el-form-item>

      <el-form-item label="打单日期" prop="order_time">
        <el-date-picker
          v-model="form.order_time"
          type="date"
          placeholder="请输入打单日期"
        />
      </el-form-item>
      <el-form-item label="运单号" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item label="状态" prop="order_status">
        <el-select
          v-model="form.order_status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="未审核" value="未审核" />
          <el-option label="未执行" value="未执行" />
          <el-option label="已执行" value="已执行" />
          <el-option label="已完成" value="已完成" />
        </el-select>
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
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
          :disabled="true"
        >
          单证录入
        </el-button>
        <el-button
          :icon="useRenderIcon(Download)"
          @click="resetForm(formRef)"
          :disabled="true"
        >
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleSubmit()"
          :disabled="haveRow"
        >
          提交
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleEdit()"
          :disabled="true"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(Delete)"
          @click="handleDelete()"
          :disabled="haveRow"
        >
          删除
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="单证管理" :columns="columns" @refresh="onSearch">
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
          @page-size-change="handleSizeChange"
          @page-current-change="handlePageChange"
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
