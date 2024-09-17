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
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessageBox
} from "element-plus";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Invoice"
});

const formRef = ref();
const dialogVisible = ref(false);
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  pagination,
  // buttonClass,
  uploadExcelDetail,
  exportExcel,
  onSearch,
  // resetForm,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  handleSelectionChange,
  handleReceiptTime
} = useRole();

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
  dialogVisible.value = false;
  onSearch();
};

const handleClose = () => {
  ElMessageBox.confirm("确定取消导入单证列表？")
    .then(() => {
      // then
      dialogVisible.value = false;
    })
    .catch(() => {
      // catch error
    });
};
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
    if (
      ["amount", "tax", "total_amount", "receipt_amount"].includes(
        column.property
      )
    ) {
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
      <el-form-item label="开票日期" prop="invoice_time">
        <el-date-picker
          v-model="form.invoice_time"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="收款日期" prop="receipt_time">
        <el-date-picker
          v-model="form.receipt_time"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="是否收款：" prop="is_receipt">
        <el-select
          v-model="form.is_receipt"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="已收款" value="已收款" />
          <el-option label="未收款" value="未收款" />
        </el-select>
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
        <el-button
          :icon="useRenderIcon(Download)"
          @click="dialogVisible = true"
        >
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
          type="danger"
          :icon="useRenderIcon(Delete)"
          @click="handleDelete()"
          :disabled="haveRow"
        >
          删除
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="导入发票" width="30%">
      <el-upload
        ref="upload"
        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :http-request="uploadExcelDetail"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            仅限上传1份文件，多次上传覆盖之前文件
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 上传 </el-button>
        </span>
      </template>
    </el-dialog>

    <PureTableBar
      title="开票信息管理(双击修改)"
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
          show-summary
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowDblclick"
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
