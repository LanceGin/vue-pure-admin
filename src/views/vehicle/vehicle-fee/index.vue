<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "VehicleFee"
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
  submitDialog,
  handleDelete,
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
      <el-form-item label="日期" prop="add_time">
        <el-date-picker
          v-model="form.add_time"
          type="date"
          placeholder="请输入日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="申请单位：" prop="company">
        <el-input
          v-model="form.company"
          placeholder="请输入申请单位"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="车头号：" prop="car_no">
        <el-input
          v-model="form.car_no"
          placeholder="请输入车头号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="车挂号：" prop="hang_board_no">
        <el-input
          v-model="form.hang_board_no"
          placeholder="请输入车挂号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="car_fees">
        <el-input
          v-model="form.car_fees"
          placeholder="请输入费用名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="状态变化内容：" prop="content">
        <el-input
          v-model="form.content"
          placeholder="请输入状态变化内容"
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
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          添加费用
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="submitDialog('提交')"
        >
          提交
        </el-button>
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(Upload)"
          @click="resetForm(formRef)"
          :disabled="haveRow"
        >
          上传附件
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

    <PureTableBar
      title="车辆费用管理（双击修改）"
      :columns="columns"
      @refresh="onSearch"
    >
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
