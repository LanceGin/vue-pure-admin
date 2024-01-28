<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../../components/RePureTableBar";
import { useRenderIcon } from "../../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
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
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  resetForm,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
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
      <el-form-item label="运单号：" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="做箱时间：" prop="make_time">
        <el-date-picker
          v-model="form.make_time"
          type="date"
          placeholder="请输入做箱时间"
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
      <el-form-item label="箱型：" prop="container_type">
        <el-select
          v-model="form.container_type"
          placeholder="请选择箱型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="40HC" value="40HC" />
          <el-option label="40GP" value="40GP" />
          <el-option label="20HC" value="20HC" />
          <el-option label="20GP" value="20GP" />
        </el-select>
      </el-form-item>
      <el-form-item label="箱号：" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="请输入箱号"
          clearable
          class="!w-[200px]"
        />
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
        <el-button
          type="danger"
          :icon="useRenderIcon(EditPen)"
          @click="resetForm(formRef)"
          :disabled="true"
        >
          一键撤回
        </el-button>
        <el-button
          type="success"
          :icon="useRenderIcon(EditPen)"
          @click="resetForm(formRef)"
          :disabled="true"
        >
          一键完成
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="进口派车单列表" :columns="columns" @refresh="onSearch">
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
          @page-current-change="handlePageChange"
          @current-change="handleCurrentChange"
        >
          <template #expand="{ row }">
            <div class="p-6 ml-10 mr-10">
              <el-steps :active="Number(row.transport_status)">
                <el-step title="已执行" />
                <el-step title="已提箱" />
                <el-step title="进拆箱门点" />
                <el-step title="出拆箱门点" />
                <el-step title="已还箱" />
                <el-step title="已完成" />
              </el-steps>
            </div>
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
</style>
