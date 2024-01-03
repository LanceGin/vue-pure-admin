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
  resetForm,
  openDialog,
  // handleDelete,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleSetInvoiceNo,
  handleSetAmount,
  handleSetRemark
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
          <el-option label="未提交" value="未提交" />
          <el-option label="未审核" value="未审核" />
          <el-option label="已审核" value="已审核" />
          <el-option label="已驳回" value="已驳回" />
        </el-select>
      </el-form-item>
      <el-form-item label="做箱时间" prop="make_time">
        <el-date-picker
          v-model="form.make_time"
          type="date"
          placeholder="请输入做箱时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="运单号：" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="箱号：" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="请输入箱号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="码头堆场：" prop="load_port">
        <el-input
          v-model="form.load_port"
          placeholder="请输入码头堆场"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="车辆：" prop="car_no">
        <el-input
          v-model="form.car_no"
          placeholder="请输入车辆"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="客户简称：" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户简称"
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
          :icon="useRenderIcon(EditPen)"
          @click="openDialog('提交')"
          :disabled="haveRow"
        >
          提交
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetInvoiceNo()"
          :disabled="haveRow"
        >
          设置发票号
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="resetForm(formRef)"
          :disabled="true"
        >
          数据比对
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetAmount()"
          :disabled="haveRow"
        >
          批量调整金额
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetRemark()"
          :disabled="haveRow"
        >
          批量备注
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="应收费用" :columns="columns" @refresh="onSearch">
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
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
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
