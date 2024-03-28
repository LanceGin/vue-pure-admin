<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../../components/RePureTableBar";
import { useRenderIcon } from "../../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
// import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Role"
});

const formRef = ref();
const {
  form,
  // haveRow,
  loading,
  columns,
  dataList,
  tableRowClassName,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange
  // handleRevoke,
  // handleFinish
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
      <el-form-item label="做箱日期：" prop="make_time_range">
        <el-date-picker
          v-model="form.make_time_range"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY/MM/DD"
        />
      </el-form-item>
      <el-form-item label="门点：" prop="door">
        <el-input
          v-model="form.door"
          placeholder="请输入门点"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="提箱点：" prop="load_port">
        <el-select
          v-model="form.load_port"
          placeholder="请选择提箱点"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="武汉金口" value="武汉金口" />
          <el-option label="武汉阳逻" value="武汉阳逻" />
        </el-select>
      </el-form-item>
      <el-form-item label="还箱点：" prop="unload_port">
        <el-select
          v-model="form.unload_port"
          placeholder="请选择还箱点"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="武汉金口" value="武汉金口" />
          <el-option label="武汉阳逻" value="武汉阳逻" />
        </el-select>
      </el-form-item>
      <el-form-item label="单据类型：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择单据类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="拆箱" value="拆箱" />
          <el-option label="装箱" value="装箱" />
        </el-select>
      </el-form-item>
      <el-form-item label="箱号：" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="多箱号换行输入"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[200px]"
        />
        <el-button link type="primary" @click="form.containner_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="车号：" prop="car_no">
        <el-input
          v-model="form.car_no"
          placeholder="请输入车号"
          clearable
          class="!w-[200px]"
        />
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
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="武汉派车单列表" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          highlight-current-row
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :row-class-name="tableRowClassName"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowDblclick"
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

:deep(.el-table) {
  --el-table-hover-text-color: red;
}

:deep(.current-row) {
  color: red;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

:deep(.pure-warning-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-3);
}

:deep(.pure-success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-3);
}
</style>
