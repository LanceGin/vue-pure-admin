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
// import AddFill from "@iconify-icons/ri/add-circle-line";

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
  handleRowDblclick,
  handleEdit,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  handleReceiptTime
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
      <el-form-item label="销方识别号：" prop="seller_identification_no">
        <el-input
          v-model="form.seller_identification_no"
          placeholder="请输入销方识别号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="购方识别号：" prop="buyer_identification_no">
        <el-input
          v-model="form.buyer_identification_no"
          placeholder="请输入购方识别号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="开票日期" prop="invoice_time">
        <el-date-picker
          v-model="form.invoice_time"
          type="date"
          placeholder="请输入开票日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="税率：" prop="tax_rate">
        <el-input
          v-model="form.tax_rate"
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
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="openDialog('新增')"
        >
          添加发票
        </el-button>
        <el-button
          type="success"
          :icon="useRenderIcon(Delete)"
          @click="handleReceiptTime()"
          :disabled="haveRow"
        >
          批量设置收款日期
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleEdit()"
          :disabled="haveRow"
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

    <PureTableBar title="开票信息管理" :columns="columns" @refresh="onSearch">
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
