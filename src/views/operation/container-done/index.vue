<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";
// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Edit from "@iconify-icons/ep/edit";

defineOptions({
  name: "ContainerDone"
});

const formRef = ref();
const {
  form,
  loading,
  containerVisible,
  haveRow,
  columns,
  containerFeeColumns,
  dataList,
  containerFeeList,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  // resetForm,
  openDialog,
  fixDialog,
  // handleDelete,
  // handleDatabase,
  // handleSubmit,
  // handleEdit,
  handleDeleteFee,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange
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
      <el-form-item label="派车单类型" prop="order_type">
        <el-select
          v-model="form.order_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="拆箱" value="拆箱" />
          <el-option label="暂落" value="暂落" />
          <el-option label="装箱" value="装箱" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户名称"
          clearable
          class="!w-[200px]"
          name="customer"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="门点" prop="door">
        <el-input
          v-model="form.door"
          placeholder="请输入门点"
          clearable
          class="!w-[200px]"
          name="door"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="日期：" prop="make_time_range">
        <el-date-picker
          v-model="form.make_time_range"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY/MM/DD"
        />
      </el-form-item>
      <el-form-item label="运单号" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
          name="track_no"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="箱号" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="多箱号换行输入"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[200px]"
          name="containner_no"
          autocomplete="on"
        />
        <el-button link type="primary" @click="form.containner_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="封号" prop="seal_no">
        <el-input
          v-model="form.seal_no"
          placeholder="请输入封号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="车号" prop="dispatch_car_no">
        <el-input
          v-model="form.dispatch_car_no"
          placeholder="请输入车号"
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
          :icon="useRenderIcon(Edit)"
          @click="openDialog('添加')"
          :disabled="haveRow"
        >
          添加异常费用
        </el-button>
        <Auth value="btn_fix_container">
          <el-button
            type="primary"
            :icon="useRenderIcon(Edit)"
            @click="fixDialog('修正')"
            :disabled="haveRow"
          >
            修正箱信息
          </el-button>
        </Auth>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="containerVisible"
      title="异常费用列表"
      width="80%"
      custom-class="container-list"
    >
      <pure-table
        border
        align-whole="center"
        showOverflowTooltip
        highlight-current-row
        :data="containerFeeList"
        :columns="containerFeeColumns"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
      >
        <template #operation="{ row }">
          <el-button
            class="reset-margin"
            link
            type="danger"
            :icon="useRenderIcon(Delete)"
            @click="handleDeleteFee(row)"
          >
            删除
          </el-button>
        </template>
      </pure-table>
    </el-dialog>

    <PureTableBar
      title="已完成派车单（双击查看异常费用）"
      :columns="columns"
      @refresh="onSearch"
    >
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
.container-list {
  height: 60%;
  overflow: scroll;
}

:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
