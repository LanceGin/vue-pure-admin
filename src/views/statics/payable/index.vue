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
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessageBox
} from "element-plus";

defineOptions({
  name: "Payable"
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
  total_amount,
  // buttonClass,
  exportExcel,
  onSearch,
  openDialog,
  uploadExcelDetail,
  // handleDelete,
  // handleDatabase,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  // handleSetInvoiceNo,
  handleSetAmount,
  handleSetRemark
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
  ElMessageBox.confirm("确定取消数据对比？")
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
    const values = data.map(item => Number(item[column.property]));
    if (["amount"].includes(column.property)) {
      sums[4] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return Number(Number(prev + curr).toFixed(2));
        } else {
          return Number(Number(prev).toFixed(2));
        }
      }, 0);
      sums[4];
    }
    if (index === 0) {
      return;
    }
  });
  sums[1] = `合计`;
  sums[2] = Math.round(total_amount.value * 100) / 100;
  sums[3] = `单页合计`;
  return sums;
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-2 pt-[6px]"
    >
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="未提交" value="未提交" />
          <el-option label="未审核" value="未审核" />
          <el-option label="已审核" value="已审核" />
          <el-option label="已驳回" value="已驳回" />
        </el-select>
      </el-form-item>
      <el-form-item label="单据类型：" prop="order_type">
        <el-select
          v-model="form.order_type"
          placeholder="请选择单据类型"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="进口" value="进口" />
          <el-option label="出口" value="出口" />
          <el-option label="陆运" value="陆运" />
          <el-option label="散货" value="散货" />
          <el-option label="船运" value="船运" />
        </el-select>
      </el-form-item>
      <el-form-item label="做箱时间：" prop="make_time_range">
        <el-date-picker
          v-model="form.make_time_range"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="运单号：" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="码头堆场：" prop="load_port">
        <el-input
          v-model="form.load_port"
          placeholder="请输入码头堆场"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="fee_name">
        <el-input
          v-model="form.fee_name"
          placeholder="请输入费用名称"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="车辆：" prop="car_no">
        <el-input
          v-model="form.car_no"
          placeholder="请输入车辆"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="客户简称：" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户简称"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="供应商：" prop="custom_name">
        <el-input
          v-model="form.custom_name"
          placeholder="请输入供应商"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="暂落点：" prop="temp_port">
        <el-input
          v-model="form.temp_port"
          placeholder="请输入暂落点"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="箱号" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="多箱号换行输入，单箱号支持模糊搜索"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[120px]"
        />
        <el-button link type="primary" @click="form.containner_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-2 pt-[6px]"
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
        <!-- <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetInvoiceNo()"
          :disabled="haveRow"
        >
          设置发票号
        </el-button> -->
        <el-button :icon="useRenderIcon(EditPen)" @click="dialogVisible = true">
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
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="数据比对" width="30%">
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
            导入文件字段格式为 箱号-运单号(非必填)-箱型-门点
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 比对 </el-button>
        </span>
      </template>
    </el-dialog>

    <PureTableBar title="应付费用" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          show-summary
          :summary-method="getSummaries"
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
          @current-change="handleCurrentChange"
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

.el-form--inline {
  .el-form-item {
    margin-right: 10px;
  }
}
</style>
